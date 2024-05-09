import Link from 'next/link';

const ServiceCard = ({ title, imageUrl, description }) => {
  return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={imageUrl} alt={title} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
            <p className="mt-2 text-gray-500">{description}</p>

            <div className="w-full flex justify-between ">


          <Link href={`/services/${title}`}>
            <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Show More
            </button>
    </Link>
    <Link href={`/${decodeURIComponent(title).replaceAll(' ', '')}`}>
  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Launch Dapp
  </button>
</Link>

            </div>
          </div>
        </div>
      </div>
  );
};
  
export default ServiceCard;