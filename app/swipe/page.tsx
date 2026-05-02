import { SwipeNav } from "@/components/swipe/SwipeNav";
import { CardStack } from "@/components/swipe/CardStack";

export default function SwipePage() {
  return (
    <>
      <SwipeNav />
      <main className="flex-1 flex items-start justify-center px-4 pt-8 pb-16 sm:pt-12 sm:pb-24">
        <CardStack />
      </main>
    </>
  );
}
