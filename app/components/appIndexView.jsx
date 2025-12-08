import { useNavigate } from "react-router";

export default function AppIndexView() {
  const navigate = useNavigate();
  return (
    <s-stack>
      <s-stack direction="inline" justifyContent="space-between">
        <s-heading>Bundle Deals</s-heading>
        <s-button variant="primary" onClick={navigate("app/bundles")}>
          Create bundle
        </s-button>
      </s-stack>

      <s-stack gap="base">
        <s-stack direction="inline" gap="base">
          <s-section>
            <s-stack gap="base">
              <s-heading>Usage overview</s-heading>

              <s-progress tone="auto" value={1}></s-progress>

              <s-text>$0/∞ added revenue this month</s-text>
            </s-stack>
          </s-section>

          <s-section>
            <s-heading>Analytics</s-heading>
            <s-stack direction="inline" gap="base">
              <s-box inlineSize="50%">
                <s-stack gap="small-300">
                  <s-text>This month’s added revenue</s-text>
                  <s-text>$0</s-text>
                </s-stack>
              </s-box>

              <s-box>
                <s-stack>
                  <s-text>All time added revenue</s-text>
                  <s-text>$0</s-text>
                </s-stack>
              </s-box>
            </s-stack>
          </s-section>

          <s-section>
            <s-stack gap="small-300">
              <s-heading>Theme Block</s-heading>
              <s-text>
                Bundles block should be manually added to the PDP page.
              </s-text>

              <s-button variant="secondary">Need help?</s-button>
            </s-stack>
          </s-section>
        </s-stack>

        <s-section accessibilityLabel="Empty state section">
          <s-grid gap="base" justifyItems="center" paddingBlock="large-400">
            <s-box maxInlineSize="200px" maxBlockSize="200px">
              {/* aspectRatio should match the actual image dimensions (width/height) */}
              <s-image
                aspectRatio="1/1"
                src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                alt="A stylized graphic of four characters, each holding a puzzle piece"
              />
            </s-box>
            <s-grid justifyItems="center" maxInlineSize="450px" gap="base">
              <s-stack alignItems="center">
                <s-heading>Create and manage bundle deals</s-heading>
                <s-paragraph>
                  Offer discounts on sets of products to encourage bulk
                  purchases and increase average order value.
                </s-paragraph>
              </s-stack>
              <s-button-group>
                <s-button
                  slot="primary-action"
                  variant="primary"
                  onClick={navigate("app/bundles")}
                >
                  {" "}
                  Add Bundle{" "}
                </s-button>
              </s-button-group>
            </s-grid>
          </s-grid>
        </s-section>
      </s-stack>
    </s-stack>
  );
}


