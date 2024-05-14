export default function Footer() {
  return (
    <footer className="p-6 border-t-4 border-gray-100 bg-gradient-to-b from-white via-gray-50 to-purple-100/30 ">
      <div className="flex justify-center">
        <p
          onClick={() => document.scrollingElement?.scrollTo({ top: 0 })}
          className="text-slate-800 text-sm cursor-pointer"
        >{`© ${new Date().getFullYear()} Jobify`}</p>
      </div>
    </footer>
  );
}
