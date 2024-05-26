"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FeedbackContainer = () => {
  return (
    <div className="mt-12 flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          className="bg-white min-w-64"
          placeholder="Enter feedback here..."
        />
        <Button>Create</Button>
      </div>
    </div>
  );
};

export default FeedbackContainer;
