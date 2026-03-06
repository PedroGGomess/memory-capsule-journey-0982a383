@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 3%;
    --foreground: 45 30% 90%;

    --card: 0 0% 6%;
    --card-foreground: 45 30% 90%;

    --popover: 0 0% 6%;
    --popover-foreground: 45 30% 90%;

    --primary: 43 72% 50%;
    --primary-foreground: 0 0% 3%;

    --secondary: 0 0% 10%;
    --secondary-foreground: 45 30% 90%;

    --muted: 0 0% 12%;
    --muted-foreground: 45 10% 55%;

    --accent: 43 72% 50%;
    --accent-foreground: 0 0% 3%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 43 20% 18%;
    --input: 0 0% 15%;
    --ring: 43 72% 50%;

    --radius: 0.25rem;

    --gold: 43 72% 50%;
    --gold-light: 43 80% 65%;
    --gold-dark: 43 60% 35%;
    --amber: 30 80% 45%;

    --sidebar-background: 0 0% 5%;
    --sidebar-foreground: 45 30% 90%;
    --sidebar-primary: 43 72% 50%;
    --sidebar-primary-foreground: 0 0% 3%;
    --sidebar-accent: 0 0% 10%;
    --sidebar-accent-foreground: 45 30% 90%;
    --sidebar-border: 43 20% 18%;
    --sidebar-ring: 43 72% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-body antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

@layer utilities {
  .text-gold-gradient {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, hsl(43 80% 65%), hsl(43 72% 50%), hsl(30 80% 45%));
  }

  .border-gold-gradient {
    border-image: linear-gradient(135deg, hsl(43 80% 65%), hsl(43 72% 50%)) 1;
  }

  .glow-gold {
    box-shadow: 0 0 40px -10px hsl(43 72% 50% / 0.3);
  }

  .section-padding {
    @apply px-6 md:px-12 lg:px-24;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: hsl(0 0% 3%);
}
::-webkit-scrollbar-thumb {
  background: hsl(43 72% 50% / 0.3);
  border-radius: 2px;
}

/* Selection color */
::selection {
  background: hsl(43 72% 50% / 0.3);
  color: hsl(45 30% 90%);
}
