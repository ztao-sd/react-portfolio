const Background = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 flex w-screen justify-center">
      <div className="h-screen w-screen bg-[url('/bg.png')] bg-repeat">
        {/* <img src="/bg.png" alt="Background" /> */}
      </div>
    </div>
  );
};

export default Background;
