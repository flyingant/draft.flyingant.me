export default function PageTitle({
  name,
}: {
  name: React.ReactNode
}) {
  return (
    <div className="container font-sans mb-4 px-4 flex items-center justify-between md:flex-row flex-col">
      <h2 className="text-2xl text-grey mt-4 mb-4">
        {name}
      </h2>
    </div>
  )
}
