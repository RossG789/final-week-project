import { UserButton } from "@clerk/nextjs";
import DataRequest from "./components/DataRequest";

export default function Page() {
  return (
    <div className="bg-base-100">
      <DataRequest />
    </div>
  );
}
