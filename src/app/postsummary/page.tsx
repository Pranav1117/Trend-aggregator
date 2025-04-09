// app/postsummary/page.tsx
import { Suspense } from "react";
import PostSummary from "./PostSummary";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading summary...</div>}>
      <PostSummary />
    </Suspense>
  );
}
