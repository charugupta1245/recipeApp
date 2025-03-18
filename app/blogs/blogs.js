"use client";

export default function RecipesPage() {
  const blogs = [
    {
      id: 1,
      title: "The Art of Baking",
      content:
        "Baking is both a science and an art. Master the perfect cake, cookies, and bread with these simple tips!",
      link: "https://example.com/baking-tips",
    },
    {
      id: 2,
      title: "Spices: The Heart of Cooking",
      content:
        "Explore how different spices bring depth and richness to your dishes. Each spice tells a unique story!",
      link: "https://example.com/spice-guide",
    },
    {
      id: 3,
      title: "Vegan Delights: Plant-Based Cooking",
      content:
        "Discover delicious plant-based recipes that are easy to cook and packed with nutrients for a healthy lifestyle!",
      link: "https://example.com/vegan-recipes",
    },
    {
      id: 4,
      title: "A Beginner’s Guide to Italian Cuisine",
      content:
        "Italian food is more than just pasta and pizza. Learn about authentic ingredients and cooking techniques!",
      link: "https://example.com/italian-food",
    },
  ];

  const recipes = [
    {
      id: 1,
      title: "Creamy Alfredo Pasta",
      description:
        "A delicious creamy white sauce pasta with parmesan and garlic. A perfect dinner delight!",
      link: "https://example.com/alfredo-pasta",
    },
    {
      id: 2,
      title: "Spicy Mexican Tacos",
      description:
        "Enjoy the bold flavors of Mexico with these spicy beef and salsa tacos.",
      link: "https://example.com/mexican-tacos",
    },
    {
      id: 3,
      title: "Homemade Margherita Pizza",
      description:
        "Simple, fresh, and full of flavor—this Margherita pizza will become your new favorite!",
      link: "https://example.com/margherita-pizza",
    },
    {
      id: 4,
      title: "Classic Chocolate Brownies",
      description:
        "Soft, chewy, and full of rich chocolate flavor, these brownies are a treat!",
      link: "https://example.com/chocolate-brownies",
    },
  ];

  return (
    <div className="min-h-screen bg-[#b33845] text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-[#FFDAB9] mb-6">
        Cooking Blogs & Recipes
      </h1>

      {/* Blog Cards Section */}
      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-[#FFDAB9] text-[#7A1C1C] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="mt-2">{blog.content}</p>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:underline mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center text-[#FFA500] mt-10 mb-6">
        Recipes
      </h2>

      {/* Recipe Cards Section */}
      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-[#FFA500] text-[#3E2723] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="mt-2">{recipe.description}</p>
            <a
              href={recipe.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:underline mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
