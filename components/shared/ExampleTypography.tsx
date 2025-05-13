const ExampleTypography = () => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4 font-rubik">Rubik Bold Examples</h2>
        <p className="font-rubik text-xl font-bold">This is Rubik Bold</p>
        <p className="font-rubik text-lg font-bold">Used for headings and important text</p>
        <p className="font-rubik text-base font-bold">Navigation items also use this font</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 font-times italic">Times New Roman Italic Examples</h2>
        <p className="font-times italic text-xl">This is Times New Roman Italic</p>
        <p className="font-times italic text-lg">Used for body text and descriptions</p>
        <p className="font-times italic text-base">Adds an elegant touch to the content</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 font-rubik">Font Combination Example</h2>
        <div className="border border-gray-700 p-6 rounded-lg">
          <h3 className="font-rubik font-bold text-xl mb-2">Project Title</h3>
          <p className="font-times italic mb-4">
            This is a description of the project using Times New Roman italic. The combination of Rubik Bold for
            headings and Times New Roman italic for body text creates an interesting typographic contrast.
          </p>
          <button className="bg-white text-black px-4 py-2 rounded font-rubik font-bold">View Project</button>
        </div>
      </div>
    </div>
  )
}

export default ExampleTypography
