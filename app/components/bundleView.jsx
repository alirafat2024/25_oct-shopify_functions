import { useState } from "react";
import { ColorPickerField } from "./ColorPickerField";
import { SelectField } from "./selectField";
import { Offers } from "./offers";
import { FiBox } from "react-icons/fi";
export default function BundleView() {
  const [activeIndex, setActiveIndex] = useState([]);
  const [giftSections, setGiftSections] = useState([]);
  const [offerSections, setOfferSections] = useState([]);
  const [showVariantSelection, setShowVariantSelection] = useState(false);
  const [showVariantImag, setShowVariantImg] = useState(false);
  const [variantImagSizeValue, setVariantImagSizeValue] = useState(5);
  const [variantImagRadiusValue, setVariantImagRadiusValue] = useState(5);
  const [comparePrice, setComparePrice] = useState(false);
  const [products, setProducts] = useState([]);

  const handleProduct = async () => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });
    setProducts(selected);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(selected);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  };
  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  const handleComparePrice = () => {
    setComparePrice(!comparePrice);
  };

  const handleVariantCheckboxChange = () => {
    setShowVariantSelection(!showVariantSelection);
  };

  const handleShowVariantImg = () => {
    setShowVariantImg(!showVariantImag);
  };

  const addOfferSection = () => {
    const newOffer = { id: Math.random() };
    setOfferSections([...offerSections, newOffer]);
  };

  const removeOfferSection = (id) => {
    setOfferSections(
      offerSections.filter((addSection) => addSection.id !== id),
    );
  };

  const addGiftSection = () => {
    const newGift = { id: Math.random() };
    setGiftSections([...giftSections, newGift]);
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
                              <s-button onClick={handleProduct}>brows</s-button>
                            </s-box>
                          </s-stack>
                          {products.length > 0 && (
                            <s-stack
                              border="base"
                              borderRadius="base"
                              padding="base"
                              justifyContent="space-between"
                              direction="inline"
                             >
                              <s-stack>
                                <s-stack gap="small">
                                  {products.map((product) => (
                                    <s-stack
                                      key={product.id}
                                      direction="inline"
                                      gap="base"
                                     >
                                      <s-box inlineSize="50px" blockSize="50px">
                                        <s-image
                                          src={
                                            product.images && product.images[0]
                                              ? product.images[0].originalSrc
                                              : ""
                                          }
                                          alt={product.title}
                                          aspectRatio="1/0.5"
                                          objectFit="cover"
                                        />
                                      </s-box>
                                      <s-box>
                                        <s-text>{product.title}</s-text>
                                        <s-paragraph>
                                          {product.publishedAt}
                                        </s-paragraph>
                                      </s-box>
                                    </s-stack>

                                    
                                  ))}
                                </s-stack>
                              </s-stack>
                              <s-box>
                                <s-icon type="x" 
                                onClick={() => removeProduct(product.id)}
                                
                                />
                              </s-box>
                            </s-stack>
                          )}
                          <s-box>
                            <s-checkbox
                              checked={showVariantSelection}
                              onChange={handleVariantCheckboxChange}
                              label="Show variant selection"
                            />
                          </s-box>
                          {showVariantSelection && (
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <s-box>
                                <s-checkbox
                                  label="Display variant image"
                                  checked={showVariantImag}
                                  onChange={handleShowVariantImg}
                                />
                              </s-box>

                              {showVariantImag && (
                                <s-stack
                                  direction="inline"
                                  justifyContent="space-between"
                                >
                                  <s-box InlineSize="170px">
                                    <s-text>
                                      Size ({variantImagSizeValue}px)
                                    </s-text>
                                    <input
                                      style={{ width: "100%" }}
                                      type="range"
                                      min="0"
                                      max="100"
                                      step="1"
                                      value={variantImagSizeValue}
                                      onChange={(e) => {
                                        setVariantImagSizeValue(e.target.value);
                                      }}
                                    />
                                  </s-box>
                                  <s-box inlineSize="170px">
                                    <s-text>
                                      Radius ({variantImagRadiusValue}px)
                                    </s-text>
                                    <input
                                      style={{ width: "100%" }}
                                      type="range"
                                      min="0"
                                      max="100"
                                      step="1"
                                      value={variantImagRadiusValue}
                                      onChange={(e) => {
                                        setVariantImagRadiusValue(
                                          e.target.value,
                                        );
                                      }}
                                    />
                                  </s-box>
                                </s-stack>
                              )}
                            </s-stack>
                          )}

                          <s-box>
                            <s-checkbox
                              label="Compare price"
                              checked={comparePrice}
                              onChange={handleComparePrice}
                            />
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
                {/* Progressive Gifts */}
                <s-section>
                  <s-stack gap="small-100">
                    <s-stack
                      direction="inline"
                      justifyContent="space-between"
                      onClick={() => handleToggle(2)}
                    >
                      <s-stack direction="inline" gap="small-300">
                        <s-icon type="gift-card" />
                        <s-heading>Progressive Gifts</s-heading>
                        <s-icon type="chevron-down" />
                      </s-stack>
                      <s-switch />
                    </s-stack>
                    {activeIndex.includes(2) && (
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

                        {giftSections.map((gift) => (
                          <s-stack gap="small-100" key={gift.id}>
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                            >
                              <s-button icon="product">select product</s-button>
                              <s-link
                                onClick={() => removeGiftSection(gift.id)}
                              >
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
                          </s-stack>
                        ))}

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
                      </s-stack>
                    )}
                  </s-stack>
                </s-section>
                {offerSections.map((addSection, index) => (
                  <s-section key={addSection}>
                    <s-stack gap="base">
                      <s-stack
                        direction="inline"
                        justifyContent="space-between"
                        onClick={() => handleToggle(addSection.id)}
                      >
                        <s-stack direction="inline" gap="small-300">
                          <s-icon type="discount-code" />
                          <s-heading>{`Offer ${index + 1}`}</s-heading>
                          <s-icon type="chevron-down" />
                        </s-stack>
                        <s-stack direction="inline">
                          <s-icon type="arrow-up" />
                          <s-icon type="arrow-down" />
                          <s-icon
                            type="duplicate"
                            onClick={(e) => {
                              e.stopPropagation();
                              addOfferSection();
                            }}
                          />
                          <s-icon
                            type="delete"
                            onClick={() => removeOfferSection(addSection.id)}
                          />
                        </s-stack>
                      </s-stack>

                      {activeIndex.includes(addSection.id) && <Offers />}
                    </s-stack>
                  </s-section>
                ))}

                <s-clickable
                  border="base"
                  padding="base"
                  background="subdued"
                  borderRadius="base"
                  onClick={addOfferSection}
                >
                  <s-stack
                    direction="inline"
                    gap="small-300"
                    justifyContent="center"
                  >
                    <s-icon type="plus-circle" />
                    <s-text>Add Offer</s-text>
                  </s-stack>
                </s-clickable>
              </s-stack>
            </s-grid-item>
            <s-grid-item gridColumn="span 3">
              <s-section>
                <s-stack gap="small-100">
                  <s-stack
                    direction="inline"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <s-stack
                      direction="inline"
                      gap="small-300"
                      alignItems="center"
                    >
                      <s-icon type="external" />
                      <s-link>Preview</s-link>
                    </s-stack>
                    <s-box>
                      <s-button disabled>Run A/B test</s-button>
                    </s-box>
                  </s-stack>

                  <s-stack gap="base">
                    <s-clickable
                      border="base"
                      padding="base"
                      background="subdued"
                      borderRadius="base"
                    >
                      <s-stack
                        direction="inline"
                        justifyContent="space-between"
                      >
                        <s-box inlineSize="160px">
                          <s-select label="Product previewing">
                            <s-option>Gift Card</s-option>
                          </s-select>
                        </s-box>
                        <s-box inlineSize="160px">
                          <s-select label="Country previewing">
                            <s-option>Afghanistan </s-option>
                          </s-select>
                        </s-box>
                      </s-stack>
                    </s-clickable>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          flexGrow: 1,
                          height: "1px",
                          backgroundColor: "black",
                          marginRight: "10px",
                        }}
                      ></div>

                      <h4 style={{ margin: "0" }}>Bundle & Save</h4>

                      <div
                        style={{
                          flexGrow: 1,
                          height: "1px",
                          backgroundColor: "black",
                          marginLeft: "10px",
                        }}
                      ></div>
                    </div>

                    <s-stack gap="small-100">
                      <s-stack border="base" borderRadius="base" padding="base">
                        <s-stack
                          direction="inline"
                          justifyContent="space-between"
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
                            <s-stack
                              alignItems="center"
                              justifyContent="center"
                            >
                              <h2>$19.00</h2>
                              {comparePrice && (
                                <s-text type="redundant">$20.00</s-text>
                              )}
                            </s-stack>
                          </s-stack>
                        </s-stack>

                        <s-stack
                          direction="inline"
                          gap="small-300"
                          alignItems="center"
                        >
                          <s-box>
                            <s-button variant="primary">#1</s-button>
                          </s-box>

                          <div
                            style={{
                              color: "gray",
                              backgroundColor: "rgba(241, 241, 241, 1)",
                              padding: `${variantImagSizeValue}px`,
                              margin: "0px",
                              borderRadius: `${variantImagRadiusValue}px`,
                            }}
                          >
                            <FiBox style={{ width: "20px", height: "20px" }} />
                          </div>

                          <s-box inlineSize="100px">
                            <s-select>
                              <s-option>$10</s-option>
                              <s-option>$25</s-option>
                              <s-option>$50</s-option>
                              <s-option>$100</s-option>
                            </s-select>
                          </s-box>
                        </s-stack>
                        <s-stack>{/* later */}</s-stack>
                      </s-stack>
                    </s-stack>
                    {/* OR */}
                    <s-stack
                      border="base"
                      padding="base"
                      borderRadius="base"
                      direction="block"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <s-box>
                        <s-choice-list>
                          <s-choice value="optional"></s-choice>
                        </s-choice-list>
                      </s-box>
                      <h3 style={{ padding: "0px", margin: "0px" }}>Buy3</h3>
                      <s-box>
                        <s-button variant="primary">Best Offer</s-button>
                      </s-box>

                      <p style={{ padding: "0px", margin: "0px" }}>5% OFF</p>
                      <p style={{ padding: "0px", margin: "0px" }}>
                        <b>$19.00</b>
                      </p>
                      <p style={{ padding: "0px", margin: "0px" }}>$20.00</p>
                    </s-stack>
                    <s-stack justifyContent="center" alignItems="center">
                      <s-button variant="primary">Add To Cart</s-button>
                    </s-stack>
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
