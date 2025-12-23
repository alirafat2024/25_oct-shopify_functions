import { useNavigate } from "react-router";
import { useLoaderData, useFetcher } from "react-router";
import { DeleteBundleModal } from "./deleteBundleModal";
export default function AppIndexView() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const loaderData = useLoaderData();
  const itemExists =
    loaderData && loaderData.data && loaderData.data.length > 0;
  // console.log("/////////////////////////////////////////////////////");
  // console.log(loaderData.data);
  // console.log("/////////////////////////////////////////////////////");
  const duplicateBundle = async (item) => {
    console.log("/////////////////////////////////////////////////////");
    console.log(item.data.data.title);
    console.log("/////////////////////////////////////////////////////");
    const createdAt = item.data.data.created_at;
    const name = `${item.data.name}(copy)`;
    const title = item.data.data.title;

    const resource =
      item.data.data.resource && item.data.data.resource.length > 0
        ? item.data.data.resource
        : null;

    const data = {
      name: name,
      title: title,
      resource: resource,
    };

    fetcher
      .submit(
        {
          name: name,
          data: JSON.stringify(data),
          created_at: createdAt,
          type: "create",
        },
        {
          method: "POST",
          action: "/app/bundles",
        },
      )
      .then(() => {
        console.log("Bundle duplicated successfully.");
      })
      .catch((error) => {
        console.error("Error duplicating bundle:", error);
      });
  };
  ////////////////////////////////////////
  const formatFullDate = (date) => {
    const d = new Date(date);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  };

  //////////////////////////////////////

  return (
    <s-stack>
      <s-stack direction="inline" justifyContent="space-between">
        <s-heading>Bundle Deals</s-heading>
        <s-button variant="primary" onClick={() => navigate("/app/bundles")}>
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
          {itemExists ? (
            <s-table>
              {/* Table Header */}
              <s-table-header-row>
                <s-table-header>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#d8eafa40",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    <s-text type="strong">NAME</s-text>
                  </div>
                </s-table-header>

                <s-table-header>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#d8eafa40",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    <s-text type="strong">STATS</s-text>
                  </div>
                </s-table-header>

                <s-table-header>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#d8eafa40",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    <s-text type="strong">CREATED AT</s-text>
                  </div>
                </s-table-header>

                <s-table-header>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#d8eafa40",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    <s-text type="strong">ACTIONS</s-text>
                  </div>
                </s-table-header>
              </s-table-header-row>

              {/* Table Body */}
              <s-table-body>
                {loaderData.data.map((item, i) => (
                  <s-table-row key={`row-${i}`}>
                    {/* Name Cell */}
                    <s-table-cell>
                      <s-stack direction="inline" gap="base">
                        <s-stack
                          direction="inline"
                          gap="base"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <s-switch />
                          <s-text>{item.data.name}</s-text>
                        </s-stack>

                        <s-badge tone="success">
                          <s-text variant="bodyXs" fontWeight="regular">
                            ACTIVE
                          </s-text>
                        </s-badge>

                        {/* <s-badge tone="enabled">
                          <s-text variant="bodyXs" fontWeight="regular">
                            Expired
                          </s-text>
                        </s-badge> */}
                      </s-stack>
                    </s-table-cell>

                    {/* Stats Cell */}
                    <s-table-cell>
                      <s-stack direction="inline" gap="small-300">
                        <s-stack>
                          <s-text>Visitors</s-text>
                          <s-text>{item.visitors || "0"}</s-text>
                        </s-stack>
                        <s-stack>
                          <s-text>CR</s-text>
                          <s-text>{item.cr || "0%"}</s-text>
                        </s-stack>
                        <s-stack>
                          <s-text>Bundles</s-text>
                          <s-text>{item.bundles || "0%"}</s-text>
                        </s-stack>
                        <s-stack>
                          <s-text>AOV</s-text>
                          <s-text>{item.aov || "$0.00"}</s-text>
                        </s-stack>
                        <s-stack>
                          <s-text>Add. Rev.</s-text>
                          <s-text>{item.additionalRevenue || "$0"}</s-text>
                        </s-stack>
                        <s-stack>
                          <s-text>Total Rev.</s-text>
                          <s-text>{item.totalRevenue || "$0"}</s-text>
                        </s-stack>
                        <s-stack>
                          <s-text>Rev. per Visitor</s-text>
                          <s-text>{item.revenuePerVisitor || "$0.00"}</s-text>
                        </s-stack>
                      </s-stack>
                    </s-table-cell>

                    {/* Created At Cell */}
                    <s-table-cell>
                      <s-text>{formatFullDate(item.data.created_at)}</s-text>
                    </s-table-cell>

                    {/* Action Cell */}
                    <s-table-cell>
                      <s-stack
                        direction="inline"
                        gap="small-200"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <s-button
                          icon="edit"
                          onClick={() =>
                            navigate(`/app/bundles/${item.id.split("/").pop()}`)
                          }
                        />
                        <s-button
                          icon="duplicate"
                          onClick={() => duplicateBundle(item)}
                        />
                        <s-button onClick={() => {}} icon="chart-vertical" />
                        <DeleteBundleModal bundleId={item.id} />
                      </s-stack>
                    </s-table-cell>
                  </s-table-row>
                ))}
              </s-table-body>
            </s-table>
          ) : (
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
                    onClick={() => navigate("/app/bundles")}
                  >
                    {" "}
                    Add Bundle{" "}
                  </s-button>
                </s-button-group>
              </s-grid>
            </s-grid>
          )}
        </s-section>
      </s-stack>
    </s-stack>
  );
}
