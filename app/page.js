import CategoryPage from "@/Components/CategoryPage";
import AnimatedText from "@/Components/Animatedtext"; // Import your AnimatedText component
import Feedback from "@/Components/Feedback";

import RecipeFinder from "@/Components/RecipeSearch";
import Hero from "@/Components/Hero";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Hero />
        <div className="mt-10 mb-8"> {/* Added margin for spacing */}</div>
        {/* <SearchBar /> */}

        {/* Add other content here */}
        <CategoryPage />
        <Feedback />
      </div>
    </>
  );
}
