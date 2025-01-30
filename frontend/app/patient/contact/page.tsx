export default function Page() {
  return (
    <div className="flex-1 px-8 py-8">

      <section className="card px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We’d love to hear from you! Reach out htmlFor any questions, concerns, or support.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg rounded-xl bg-white p-8 shadow-lg">
          <form action="#" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0">

              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">Full Name</label>
                <input type="text" id="name" name="name" required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-sky-500 focus:ring-sky-500" />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">Email Address</label>
                <input type="email" id="email" name="email" required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-sky-500 focus:ring-sky-500" />
              </div>

            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">Message</label>
              <textarea id="message" name="message" required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-sky-500 focus:ring-sky-500"></textarea>
            </div>

            <div className="text-center">
              <button type="submit"
                className="w-full rounded-lg bg-sky-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}
