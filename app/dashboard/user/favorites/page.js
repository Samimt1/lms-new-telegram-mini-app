export default function Favorites() {
  const favorites = [
    { id: 1, title: "Advanced JavaScript", instructor: "John Doe" },
    { id: 2, title: "React Native", instructor: "Jane Smith" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">
            You haven't added any courses to favorites yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {fav.title}
                </h3>
                <p className="text-gray-600 mt-1">By {fav.instructor}</p>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-between">
                <button className="text-blue-600 hover:text-blue-800">
                  View Course
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
