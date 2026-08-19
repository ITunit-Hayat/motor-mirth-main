import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Award, Users, Car, Star } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — VelocityMotors" },
      { name: "description", content: "Our story, mission, and the team behind VelocityMotors." },
      { property: "og:title", content: "About Us — VelocityMotors" },
      { property: "og:description", content: "Our story, mission, and the team behind VelocityMotors." },
    ],
  }),
  component: About,
});

const stats = [
  { icon: Car, k: "12+", v: "Years in business" },
  { icon: Users, k: "10,000+", v: "Happy customers" },
  { icon: Award, k: "38", v: "Industry awards" },
  { icon: Star, k: "4.9/5", v: "Average review" },
];

function About() {
  return (
    <PublicLayout>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">A dealership built on trust, not tactics.</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-80">
            Since 2013, VelocityMotors has been redefining what buying a car should feel like — honest, human, and effortless.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-2 items-center">
        <img
          src="https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1400&q=80"
          alt="Our showroom"
          className="rounded-2xl shadow-elegant"
        />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            What started as a single showroom in downtown Los Angeles has grown into
            one of the most trusted names in premium automotive retail. We built
            VelocityMotors on a simple idea: treat every buyer like a friend, not a target.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Today we serve thousands of drivers a year with a curated inventory of
            luxury, performance, and everyday vehicles — each one inspected, priced fairly, and backed by our lifetime support promise.
          </p>
          <div className="mt-8 p-6 rounded-2xl bg-secondary/60 border-l-4 border-accent">
            <div className="text-sm font-semibold uppercase tracking-wider text-accent">Our Mission</div>
            <p className="mt-2 text-lg font-medium">
              To make buying a car the best part of owning one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
              <s.icon className="h-6 w-6 text-accent" />
              <div className="mt-3 text-3xl font-display font-bold">{s.k}</div>
              <div className="text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
