import flagsmithInstance from "@/lib/flagsmith";

export default async function FeatureTest() {
  const flags = await flagsmithInstance.getEnvironmentFlags();
  return (
    <>
      {flags.isFeatureEnabled("feature-flag-test") && (
        <h2 className="text-4xl font-extrabold text-fuchsia-500">
          This is a feature flag
        </h2>
      )}
    </>
  );
}
