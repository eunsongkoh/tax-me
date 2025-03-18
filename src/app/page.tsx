import SignIn from "@/components/SignIn";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  return (
    <div className="h-screen container mx-auto px-2 flex flex-col items-center justify-center pb-10">
      <Fade>
        <div className="mb-2 text-center">
          <p className="text-2xl">taxMe</p>
          <p>your grocery sidekick</p>
        </div>
        <SignIn />
      </Fade>
    </div>
  );
}
