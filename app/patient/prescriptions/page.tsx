export default function Page() {
  return (
    <div className="flex-1 px-8 py-8">
      <div className="mx-auto max-w-7xl rounded-lg">
        <h1 className="mb-4 text-3xl font-semibold text-gray-900">Prescriptions</h1>

        <div className="overflow-x-auto rounded-lg border-2 border-solid border-gray-300">
          <table className="w-full bg-card text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4">Drug Name</th>
                <th scope="col" className="px-6 py-4">No. of Units</th>
                <th scope="col" className="px-6 py-4">Dosage</th>
                <th scope="col" className="px-6 py-4">No. of Days</th>
                <th scope="col" className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">Paracetamol Biogesic</td>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">Twice</td>
                <td className="px-6 py-4">7</td>
                <td className="px-6 py-4">10:30</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4">Paracetamol Biogesic</td>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">Twice</td>
                <td className="px-6 py-4">7</td>
                <td className="px-6 py-4">10:30</td>
              </tr>
              <tr className="">
                <td className="px-6 py-4">Paracetamol Biogesic</td>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">Twice</td>
                <td className="px-6 py-4">7</td>
                <td className="px-6 py-4">10:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
