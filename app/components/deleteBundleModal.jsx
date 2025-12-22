import { useFetcher } from "react-router";

export const DeleteBundleModal = ({ bundleId }) => {
  const fetcher = useFetcher();

  return (
    <>
      <s-button variant="secondary" commandFor={`modal${bundleId}`}>
        <s-icon type="delete" tone="critical" />
      </s-button>
      <s-modal id={`modal${bundleId}`} heading="Are you sure">
        <s-paragraph>Do you want to remove this bundle?</s-paragraph>

        <s-button
          slot="secondary-actions"
          commandFor={`modal${bundleId}`}
          command="--hide"
        >
          No
        </s-button>
        <s-button
          slot="primary-action"
          variant="primary"
          tone="critical"
          commandFor={`modal${bundleId}`}
          command="--hide"
          onClick={() => {
            fetcher.submit(
              {
                metaobjectId: bundleId,
                type: "delete",
              },
              { method: "POST" },
            );
          }}
        >
          Yes
        </s-button>
      </s-modal>
    </>
  );
};