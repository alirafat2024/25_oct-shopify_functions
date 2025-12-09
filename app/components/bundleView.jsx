import { useState } from "react";
import { ColorPickerField } from "./ColorPickerField";
import { SelectField } from "./selectField";
export default function BundleView() {
  const [activeIndex, setActiveIndex] = useState([]);
  const [giftSections, setGiftSections] = useState([]);
  const [isGiftAdded, setIsGiftAdded] = useState(false);
  const addGiftSection = () => {
    const newGift = {
      id: Math.random(),
    };
    setGiftSections([...giftSections, newGift]);
    setIsGiftAdded(true);
  };

  const removeGiftSection = (id) => {
    setGiftSections(giftSections.filter((gift) => gift.id !== id));
  };

  const handleToggle = (index) => {
    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((i) => i !== index));
    } else {
      setActiveIndex([...activeIndex, index]);
    }
  };
  return (
    <s-page>
      <s-stack direction="block" gap="base">
        <s-box>
          <s-stack
            direction="inline"
            gap="base"
            justifyContent="start"
            alignItems="center"
          >
            <s-box>
              <s-clickable
                background="transparent"
                href="/app"
                borderRadius="small-300"
              >
                <s-icon type="arrow-left" />
              </s-clickable>
            </s-box>

            <s-stack direction="inline" gap="small-300" alignItems="center">
              <h2> Bundle</h2>
              <s-badge tone="success">New</s-badge>
            </s-stack>
          </s-stack>
          <s-heading>Create a new bundle for your customers.</s-heading>
        </s-box>

        <s-query-container>
          <s-grid
            gridTemplateColumns="@container (inline-size > 500px)1fr 1fr 1fr 1fr 1fr 1fr 1fr, 1fr"
            alignItems="start"
            gap="base"
          >
            <s-grid-item gridColumn="span 4">
              <s-stack gap="small-300">
                {/* Trigger */}
                <s-section>
                  <s-stack gap="small-300">
                    <s-stack
                      direction="inline"
                      gap="small-300"
                      onClick={() => handleToggle(0)}
                    >
                      <s-icon type="settings" />
                      <s-heading>Trigger</s-heading>
                      <s-icon type="chevron-down" />
                    </s-stack>
                    {activeIndex.includes(0) && (
                      <s-stack gap="base">
                        <s-stack
                          direction="inline"
                          gap="small-300"
                          justifyContent="center"
                        >
                          <s-box InlineSize="245px">
                            <s-text-field label="Bundle name" />
                            <s-text type="small">
                              Customer wont see it,But it will be the
                              discount/bundle name.
                            </s-text>
                          </s-box>
                          <s-box InlineSize="245px">
                            <s-text-field label="Bundle title" />
                          </s-box>
                        </s-stack>
                        <s-stack gap="small-300">
                          <s-stack
                            direction="inline"
                            gap="base"
                            alignItems="center"
                          >
                            <s-box inlineSize="350px">
                              <s-select label="Trigger">
                                <s-option>specific collection</s-option>
                                <s-option>specific products</s-option>
                              </s-select>
                            </s-box>
                            <s-box paddingBlockStart="base">
                              <s-button>brows</s-button>
                            </s-box>
                          </s-stack>
                          <s-box>
                            <s-checkbox label="Show variant selection" />
                          </s-box>
                          <s-box>
                            <s-checkbox defaultChecked label="Compare price" />
                          </s-box>
                        </s-stack>
                      </s-stack>
                    )}
                  </s-stack>
                </s-section>
                {/* Style*/}
                <s-section>
                  <s-stack>
                    <s-stack
                      direction="inline"
                      gap="small-300"
                      onClick={() => {
                        handleToggle(1);
                      }}
                    >
                      <s-icon type="paint-brush-flat" />
                      <s-heading>Style</s-heading>
                      <s-icon type="chevron-down" />
                    </s-stack>
                    {activeIndex.includes(1) && (
                      <s-stack gap="small-100">
                        <s-stack gap="small-100">
                          <s-stack
                            direction="inline"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <s-heading>alignment</s-heading>
                            <s-stack direction="inline" gap="base">
                              <s-box border="base">
                                <s-image
                                  aspectRatio="1"
                                  src="/app/assets/vertical.svg"
                                  objectFit="contain"
                                />
                              </s-box>

                              <s-box border="base">
                                <s-image
                                  src="/app/assets/horizontal.svg"
                                  aspectRatio="1"
                                  objectFit="contain"
                                />
                              </s-box>
                            </s-stack>
                          </s-stack>
                          <s-box>
                            <s-text>Border Radius (8px)</s-text>
                            <input
                              style={{ width: "100%" }}
                              type="range"
                              min="0"
                              max="100"
                              step="1"
                            ></input>
                          </s-box>
                          <s-box>
                            <s-heading>General Colors</s-heading>
                          </s-box>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField label={"Title"} />
                            <ColorPickerField label={"Title Lines"} />
                          </s-stack>
                          <s-divider></s-divider>
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-heading>Card Colors</s-heading>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField label={"Card bg"} />
                            <ColorPickerField label={"Selected Card bg"} />
                            <ColorPickerField label={"Card Title"} />
                            <ColorPickerField label={"Card Subtitle"} />
                          </s-stack>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField label={"Price"} />
                            <ColorPickerField label={"Compare Price"} />
                            <ColorPickerField label={"Border"} />
                          </s-stack>
                          <s-divider></s-divider>
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-heading>Inside Badge Colors</s-heading>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField label={"Text"} />
                            <ColorPickerField label={"Background"} />
                            <s-divider />
                          </s-stack>
                        </s-stack>
                        <s-stack gap="small-100">
                          <s-heading>Upsell Colors</s-heading>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField label={"Background"} />
                            <s-divider />
                          </s-stack>
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-heading>Typography</s-heading>

                          <s-stack gap="small-100">
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                              gap="base"
                            >
                              <SelectField label={"Main Title"} />
                              <SelectField label={"Card Title"} />
                            </s-stack>
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                              gap="base"
                            >
                              <SelectField label={"Card Subtitle"} />
                              <SelectField label={"Inside Badge"} />
                            </s-stack>
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                              gap="base"
                            >
                              <SelectField label={"Outside Badge"} />
                              <SelectField label={"ATC Button"} />
                            </s-stack>
                          </s-stack>
                          <s-divider />
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-stack
                            direction="inline"
                            justifyContent="space-between"
                          >
                            <s-box InlineSize="250px">
                              <s-paragraph>Padding Y (0.6rem) </s-paragraph>
                              <input
                                style={{ width: "100%" }}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                              ></input>
                            </s-box>
                            <s-box InlineSize="250px">
                              <s-paragraph>Border Radius (0.3rem) </s-paragraph>
                              <input
                                style={{ width: "100%" }}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                              ></input>
                            </s-box>
                          </s-stack>
                          <s-box>
                            <s-checkbox defaultChecked label="Full Width" />
                          </s-box>
                          <s-box>
                            <s-text-area
                              label="Custom CSS"
                              value="*[id*='Quantity'],
                                  *[id*='price-template'],
                                  *[class*='product-form'] {
                                    display: none;
                                  }"
                              rows={6}
                            />
                          </s-box>
                        </s-stack>
                      </s-stack>
                    )}
                  </s-stack>
                </s-section>

                <s-section>
                  <s-stack gap="small-100">
                    <s-stack direction="inline" justifyContent="space-between">
                      <s-stack direction="inline" gap="small-300">
                        <s-icon type="gift-card" />
                        <s-heading>Progressive Gifts</s-heading>
                        <s-icon type="chevron-down" />
                      </s-stack>
                      <s-switch />
                    </s-stack>

                    <s-stack gap="small-100">
                      <s-stack
                        direction="inline"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <s-heading>alignment</s-heading>
                        <s-stack direction="inline" gap="base">
                          <s-box border="base">
                            <s-image
                              aspectRatio="1"
                              src="/app/assets/vertical.svg"
                              objectFit="contain"
                            />
                          </s-box>

                          <s-box border="base">
                            <s-image
                              src="/app/assets/horizontal.svg"
                              aspectRatio="1"
                              objectFit="contain"
                            />
                          </s-box>
                        </s-stack>
                      </s-stack>
                      <s-stack
                        direction="inline"
                        justifyContent="space-between"
                      >
                        <s-box inlineSize="250px">
                          <s-text-field
                            label="Titel"
                            value="Free gifts with your order"
                          />
                        </s-box>
                        <s-box inlineSize="250px">
                          <s-text-field
                            label="Subtitle"
                            value="Unlock selecting a higher bundle"
                          />
                        </s-box>
                      </s-stack>
                      {!isGiftAdded && (
                        <s-clickable
                          border="base"
                          padding="small-300"
                          borderRadius="base"
                          onClick={addGiftSection}
                        >
                          <s-stack
                            direction="inline"
                            gap="small-300"
                            justifyContent="center"
                          >
                            <s-icon type="gift-card" />
                            <s-text>Add Free Gift</s-text>
                          </s-stack>
                        </s-clickable>
                      )}
                      {giftSections.map((gift) => (
                        <s-stack gap="small-100" key={gift.id}>
                          <s-stack
                            direction="inline"
                            justifyContent="space-between"
                          >
                            <s-button icon="product">select product</s-button>
                            <s-link onClick={() => removeGiftSection(gift.id)}>
                              remove
                            </s-link>
                          </s-stack>

                          <s-select label="unlock at">
                            <s-option>Offer 1</s-option>
                            <s-option>Offer 2</s-option>
                            <s-option>Offer 3</s-option>
                          </s-select>

                          <s-stack
                            direction="inline"
                            justifyContent="space-between"
                          >
                            <s-box inlineSize="250px">
                              <s-text-field label="Label" value="FREE" />
                            </s-box>
                            <s-box inlineSize="250px">
                              <s-text-field
                                label="Crossed Label"
                                value="{{price}}"
                              />
                            </s-box>
                          </s-stack>

                          <s-stack
                            direction="inline"
                            justifyContent="space-between"
                          >
                            <s-box inlineSize="250px">
                              <s-text-field label="Label" value="FREE" />
                            </s-box>
                            <s-box inlineSize="250px">
                              <s-text-field
                                label="Crossed Label"
                                value="{{price}}"
                              />
                            </s-box>
                          </s-stack>

                          {!isGiftAdded && (
                            <s-clickable
                              border="base"
                              padding="small-300"
                              borderRadius="base"
                              onClick={addGiftSection}
                            >
                              <s-stack
                                direction="inline"
                                gap="small-300"
                                justifyContent="center"
                              >
                                <s-icon type="gift-card" />
                                <s-text>Add Free Gift</s-text>
                              </s-stack>
                            </s-clickable>
                          )}
                        </s-stack>
                      ))}
                    </s-stack>
                  </s-stack>
                </s-section>
                <s-section>
                  <s-stack direction="inline" gap="small-300">
                    <s-icon type="discount-code" />
                    <s-heading>Offer 1</s-heading>
                    <s-icon type="chevron-down" />
                  </s-stack>
                </s-section>
                <s-section>
                  <s-stack direction="inline" gap="small-300">
                    <s-icon type="discount-code" />
                    <s-heading>Offer 2</s-heading>
                    <s-icon type="chevron-down" />
                  </s-stack>
                </s-section>
                <s-section>
                  <s-stack direction="inline" gap="small-300">
                    <s-icon type="discount-code" />
                    <s-heading>Offer 3</s-heading>
                    <s-icon type="chevron-down" />
                  </s-stack>
                </s-section>
              </s-stack>
            </s-grid-item>
            <s-grid-item gridColumn="span 3">
              <s-section>
                <s-stack gap="base">
                  <s-clickable
                    border="base"
                    padding="base"
                    background="subdued"
                    borderRadius="base"
                  >
                    View Shipping Settings
                  </s-clickable>
                  <s-heading>Bundle & Save</s-heading>
                  <s-stack gap="small-100">
                    <s-stack
                      border="base"
                      direction="inline"
                      justifyContent="space-between"
                      borderRadius="base"
                      padding="base"
                    >
                      <s-stack
                        direction="inline"
                        gap="base"
                        alignItems="center"
                      >
                        <s-stack>
                          <s-choice-list>
                            <s-choice value="optional"></s-choice>
                          </s-choice-list>
                        </s-stack>
                        <s-stack>
                          <s-heading>Buy 1</s-heading>
                          <s-text>Regular price</s-text>
                        </s-stack>
                      </s-stack>
                      <s-stack>
                        <h2>$10.00</h2>
                      </s-stack>
                    </s-stack>
                    <s-stack
                      border="base"
                      direction="inline"
                      justifyContent="space-between"
                      borderRadius="base"
                      padding="base"
                    >
                      <s-stack
                        direction="inline"
                        gap="base"
                        alignItems="center"
                      >
                        <s-stack>
                          <s-choice-list>
                            <s-choice value="optional"></s-choice>
                          </s-choice-list>
                        </s-stack>
                        <s-stack>
                          <s-stack
                            direction="inline"
                            gap="small-300"
                            alignItems="center"
                          >
                            <s-heading>Buy 2</s-heading>
                            <s-box>
                              <s-button
                                variant="primary"
                                borderRadius="large-500"
                              >
                                Best Offer
                              </s-button>
                            </s-box>
                          </s-stack>
                          <s-text>5% OFF</s-text>
                        </s-stack>
                      </s-stack>
                      <s-stack>
                        <h2>$19.00</h2>
                      </s-stack>
                    </s-stack>
                    <s-stack
                      border="base"
                      direction="inline"
                      justifyContent="space-between"
                      borderRadius="base"
                      padding="base"
                    >
                      <s-stack
                        direction="inline"
                        gap="base"
                        alignItems="center"
                      >
                        <s-stack>
                          <s-choice-list>
                            <s-choice value="optional"></s-choice>
                          </s-choice-list>
                        </s-stack>
                        <s-stack>
                          <s-stack
                            direction="inline"
                            gap="small-300"
                            alignItems="center"
                          >
                            <s-heading>Buy 3</s-heading>
                            <s-box borderRadius="large-100">
                              <s-button variant="primary">
                                $20 discount
                              </s-button>
                            </s-box>
                          </s-stack>
                          <s-text>$10 OFF</s-text>
                        </s-stack>
                      </s-stack>
                      <s-stack>
                        <h2>$0.00</h2>
                      </s-stack>
                    </s-stack>
                  </s-stack>
                  <s-stack justifyContent="center" alignItems="center">
                    <s-button variant="primary">Add To Cart</s-button>
                  </s-stack>
                </s-stack>
              </s-section>
            </s-grid-item>
          </s-grid>
        </s-query-container>
      </s-stack>
    </s-page>
  );
}
