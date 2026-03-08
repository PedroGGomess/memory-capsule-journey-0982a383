import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, academyCode, academyUrl } = await req.json();

    if (!name || !email || !academyCode) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, academyCode" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build the email HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#0c0a09;border:1px solid rgba(180,140,60,0.3);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:48px 40px 24px;">
              <p style="margin:0;font-size:10px;letter-spacing:4px;color:rgba(180,140,60,0.5);text-transform:uppercase;">Academy</p>
              <h1 style="margin:8px 0 0;font-size:32px;font-weight:300;color:#b48c3c;letter-spacing:2px;">The 100's</h1>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td align="center" style="padding:0 40px;">
              <table width="80" cellpadding="0" cellspacing="0">
                <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#b48c3c,transparent);"></td></tr>
              </table>
            </td>
          </tr>

          <!-- Welcome -->
          <tr>
            <td align="center" style="padding:32px 40px 16px;">
              <p style="margin:0;font-size:10px;letter-spacing:3px;color:rgba(180,140,60,0.4);text-transform:uppercase;">Bem-vindo à equipa</p>
              <h2 style="margin:12px 0 0;font-size:24px;font-weight:300;color:#f0e6d2;">${name}</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:16px 40px 32px;">
              <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:rgba(240,230,210,0.7);text-align:center;">
                Foste adicionado à <strong style="color:#b48c3c;">The 100's Academy</strong>. 
                Aqui vais descobrir tudo sobre a nossa marca, produtos e filosofia.
              </p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:rgba(240,230,210,0.7);text-align:center;">
                Usa o código abaixo para aceder à tua área de formação.
              </p>
            </td>
          </tr>

          <!-- Academy Code Box -->
          <tr>
            <td align="center" style="padding:0 40px 32px;">
              <table cellpadding="0" cellspacing="0" style="border:1px solid rgba(180,140,60,0.3);background-color:rgba(180,140,60,0.05);">
                <tr>
                  <td style="padding:8px 24px;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:rgba(180,140,60,0.5);text-transform:uppercase;text-align:center;">Código de Acesso</p>
                    <p style="margin:0;font-size:24px;font-weight:bold;letter-spacing:6px;color:#b48c3c;text-align:center;font-family:monospace;">${academyCode}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:0 40px 32px;">
              <a href="${academyUrl}" style="display:inline-block;padding:14px 40px;border:1px solid rgba(180,140,60,0.4);color:#b48c3c;text-decoration:none;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Georgia,'Times New Roman',serif;">
                Entrar na Academy
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding:0 40px;">
              <table width="80" cellpadding="0" cellspacing="0">
                <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#b48c3c,transparent);"></td></tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 40px 40px;">
              <p style="margin:0;font-size:10px;color:rgba(180,140,60,0.3);letter-spacing:2px;font-style:italic;">
                "O tempo revela o verdadeiro valor."
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Use Lovable's email API to send transactional email
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const projectId = supabaseUrl.replace('https://', '').replace('.supabase.co', '');

    const emailResponse = await fetch(`https://api.lovable.dev/v1/projects/${projectId}/email/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: `Bem-vindo à The 100's Academy, ${name}!`,
        html: htmlContent,
        purpose: 'transactional',
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      console.error(`Email API failed [${emailResponse.status}]: ${errorBody}`);
      // Don't fail the whole operation - email is best-effort
      return new Response(
        JSON.stringify({ success: true, emailSent: false, reason: "Email service not yet configured" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, emailSent: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-welcome-email:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
