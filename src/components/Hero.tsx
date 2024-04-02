import ToolTip from "./ToolTip";

const Hero = () => {
  return (
    <div className="bg-white h-full">
      <div className="max-w-5xl mx-auto md:grid md:grid-cols-2 flex flex-col items-center gap-4 h-full">
        <div className="space-y-5 flex-1 p-4">
          <div>
            <h1 className="text-gray-900 font-semibold md:text-3xl text-2xl">
              Podify App:
            </h1>
            <h1 className="text-gray-900 font-semibold md:text-3xl text-2xl">
              FullStack App with React Native and Node.js!
            </h1>
          </div>
          <p className="text-gray-900">
            Embark on an auditory adventure with Podify - your passport to an
            eclectic mix of genres, from soothing melodies to pulsating beats.
            Explore new sounds, discover hidden gems, and let the music take you
            on a captivating voyage through rhythm and melody. Whether you're
            seeking relaxation or stimulation, Podify is your ultimate
            destination for immersive musical exploration
          </p>

          <ToolTip tooltip="Full Stack App">
            <p>Stack: React Native, Typescript, Nodejs,Express, MongoDB</p>
          </ToolTip>

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://github.com/1dominik7/Podify-ReactNative-"
              className="bg-[#7e89fd] hover:bg-[#6c78fe] text-white font-bold px-10 py-2 rounded-md inline-block cursor-pointer"
            >
              Check It
            </a>
          </div>
        </div>
        <div className="p-4 flex-1">
          <div className="border-4 border-[#7e89fd] rounded-full aspect-square flex items-center justify-center p-10">
            <img className="w-full h-auto" src="hero.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
