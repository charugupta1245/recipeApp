import AnimatedText from "@/Components/Animatedtext";
import RecipeFinder from "@/Components/RecipeSearch";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-orange-100 pt-10 px-4">
      <br></br>
      <br></br>
      <br></br>
      <div className="flex flex-col items-center">
        <div className="mt-10 mb-8">
          {" "}
          {/* Added margin for spacing */}
          <AnimatedText
            text="🔥 Sizzling flavors on the way...."
            restartDelay={6000}
          />
        </div>
      </div>
      <RecipeFinder />
    </div>
  );
};

export default Page;
