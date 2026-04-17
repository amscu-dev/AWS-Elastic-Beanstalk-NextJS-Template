import packageJson from "../../package.json";

export default function AppVersion() {
  return (
    <div
      className="
        animate-bounce rounded-4xl border-2 border-amber-500 px-8 py-3 text-sm
        hover:animate-none hover:cursor-pointer
      "
      style={{ animationDuration: "2s" }}
    >
      <a href="https://github.com/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD">
        app-version@{packageJson.version}
      </a>
    </div>
  );
}
