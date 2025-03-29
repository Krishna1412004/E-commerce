'use client';

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between">
          <div className="flex flex-col gap-4 w-[300px]">
            <Button variant="default">Default Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
