import { useState } from "react";
import { ColorPickerField } from "./ColorPickerField";
import { SelectField } from "./selectField";
import { Offers } from "./offers";
import { FiBox } from "react-icons/fi";
export default function BundleView() {
  //////////Progressive Gifts/////////////////
  const [giftSections, setGiftSections] = useState([]);
  const [textField1, setTextField1] = useState("🎁 Free gifts with your order");
  const [textField2, setTextField2] = useState(
    "Unlock selecting a higher bundle",
  );
  const [switchState, setSwitchState] = useState(false);

  const [giftTitle, setGiftTitle] = useState();
  const [giftPrice, setGiftPrice] = useState("$10.00");
  const [giftType, setGiftType] = useState("FREE");
  const [giftLock, setGiftLock] = useState("Lock");
  const [selectedGiftImage, setSelectedGiftImage] = useState("horizontal");

  const handleGiftImageSelect = (image) => {
    setSelectedGiftImage(image);
  };

  const handleSwitchChange = () => {
    setSwitchState(!switchState);
  };

  const handleGiftProduct = async (giftSectionId) => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,
    });

    setGiftSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? { ...section, giftProducts: selected }
          : section,
      ),
    );
  };

  const removeGiftProduct = (productId, giftSectionId) => {
    setGiftSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? {
              ...section,
              giftProducts: section.giftProducts.filter(
                (product) => product.id !== productId,
              ),
            }
          : section,
      ),
    );
  };

  const addGiftSection = () => {
    const newGift = {
      id: Math.random(),
      giftType: "FREE",
      giftPrice: "$10.00",
      giftLock: "Lock",
      giftProducts: [],
    };
    setGiftSections([...giftSections, newGift]);
  };
  const removeGiftSection = (id) => {
    setGiftSections(giftSections.filter((gift) => gift.id !== id));
  };

  const updateGiftSectionField = (value, field, giftSectionId) => {
    setGiftSections((prevSections) =>
      prevSections.map((section) =>
        section.id === giftSectionId
          ? { ...section, [field]: value } 
          : section,
      ),
    );
  };
  //////////////////////////////////////////
  // Card Colors
  const [titleColor, setTitleColor] = useState("#000000");
  const [lineleColor, setLineColor] = useState("#AAF0FB");
  const [cardBgColor, setCardBgColor] = useState("#FFFFFF");
  const [selectedCardBgColor, setSelectedCardBgColor] = useState("#AAF0FB");
  const [cardTitleColor, setCardTitleColor] = useState("#000000");
  const [cardSubtitleColor, setCardSubtitleColor] = useState("#7E5050");
  const [priceColor, setPriceColor] = useState("#000000");
  const [comparePriceColor, setComparePriceColor] = useState("#808080");
  const [borderColor, setBorderColor] = useState("#CCCCCC");
  //  Inside Badge Colors
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  ///////////////button//////////////////

  const [atcButtonBackgroundColor, setAtcButtonBackgroundColor] =
    useState("#000000");
  const [atcButtonTextColor, setAtcButtonTextColor] = useState("#FFFFFF");
  const [paddingButton, setPaddingButton] = useState(10);
  const [borderRadiusButton, setBorderRadiusButton] = useState(10);
  ///////////////////////////////////////////////
  //  Outside Badge Colors
  const [outsideTextColor, setOutsideTextColor] = useState("#747474");
  const [outsideBackgroundColor, setOutsideBackgroundColor] =
    useState("#FFF100");
  const [upsellBackgroundColor, setUpsellBackgroundColor] = useState("#E5E7EB");
  ////////////////////////////////////////////////////////////////////////////
  const [fontSettings, setFontSettings] = useState({
    mainTitle: { fontSize: 24, fontStyle: "700" },
    cardTitle: { fontSize: 19.2, fontStyle: "500" },
    cardSubtitle: { fontSize: 16, fontStyle: "400" },
    insideBadge: { fontSize: 14, fontStyle: "400" },
    outsideBadge: { fontSize: 14, fontStyle: "400" },
    atcButton: { fontSize: 16, fontStyle: "400" },
  });

  const handleFontSizeChange = (field, value) => {
    setFontSettings((prevSettings) => ({
      ...prevSettings,
      [field]: { ...prevSettings[field], fontSize: value },
    }));
  };

  const handleFontStyleChange = (field, value) => {
    const [fontWeight, italic] = value.split("-");

    setFontSettings((prevSettings) => ({
      ...prevSettings,
      [field]: {
        ...prevSettings[field],
        fontStyle: fontWeight,
        italic: italic || "",
      },
    }));
  };

  ///////////////////////////////////////////////////////
  const [devBorder, setDevBorder] = useState(5);
  const [selectedImage, setSelectedImage] = useState("horizontal");
  const [activeIndex, setActiveIndex] = useState([]);

  const [offerSections, setOfferSections] = useState([]);
  const [showVariantSelection, setShowVariantSelection] = useState(false);
  const [showVariantImag, setShowVariantImg] = useState(false);
  const [variantImagSizeValue, setVariantImagSizeValue] = useState(2);
  const [variantImagRadiusValue, setVariantImagRadiusValue] = useState(2);
  const [comparePrice, setComparePrice] = useState(false);
  const [products, setProducts] = useState([]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

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
                            >
                              {products.map((product) => (
                                <s-stack
                                  key={product.id}
                                  direction="inline"
                                  gap="base"
                                  justifyContent="space-between"
                                >
                                  <s-stack direction="inline" gap="base">
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

                                  <s-box>
                                    <s-icon
                                      type="x"
                                      onClick={() => removeProduct(product.id)}
                                    />
                                  </s-box>
                                </s-stack>
                              ))}
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
                              <s-box
                                borderColor={
                                  selectedImage === "horizontal"
                                    ? "strong"
                                    : "base"
                                }
                                border="base"
                                onClick={() => handleImageSelect("horizontal")}
                              >
                                <s-image
                                  aspectRatio="1"
                                  src="/app/assets/vertical.svg"
                                  objectFit="contain"
                                />
                              </s-box>

                              <s-box
                                borderColor={
                                  selectedImage === "vertical"
                                    ? "strong"
                                    : "base"
                                }
                                border="base"
                                onClick={() => handleImageSelect("vertical")}
                              >
                                <s-image
                                  src="/app/assets/horizontal.svg"
                                  aspectRatio="1"
                                  objectFit="contain"
                                />
                              </s-box>
                            </s-stack>
                          </s-stack>
                          <s-box>
                            <s-text>Border Radius ({devBorder}px)</s-text>
                            <input
                              value={devBorder}
                              onChange={(e) => {
                                setDevBorder(e.target.value);
                              }}
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
                            <ColorPickerField
                              label={"Title"}
                              color={titleColor}
                              onChange={setTitleColor}
                            />
                            <ColorPickerField
                              label={"Title Lines"}
                              color={lineleColor}
                              onChange={setLineColor}
                            />
                          </s-stack>
                          <s-divider></s-divider>
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-heading>Card Colors</s-heading>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField
                              color={cardBgColor}
                              onChange={setCardBgColor}
                              label={"Card bg"}
                            />
                            <ColorPickerField
                              label={"Selected Card bg"}
                              color={selectedCardBgColor}
                              onChange={setSelectedCardBgColor}
                            />
                            <ColorPickerField
                              color={cardTitleColor}
                              onChange={setCardTitleColor}
                              label={"Card Title"}
                            />
                            <ColorPickerField
                              color={cardSubtitleColor}
                              onChange={setCardSubtitleColor}
                              label={"Card Subtitle"}
                            />
                          </s-stack>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField
                              color={priceColor}
                              onChange={setPriceColor}
                              label={"Price"}
                            />
                            <ColorPickerField
                              color={comparePriceColor}
                              onChange={setComparePriceColor}
                              label={"Compare Price"}
                            />
                            <ColorPickerField
                              color={borderColor}
                              onChange={setBorderColor}
                              label={"Border"}
                            />
                          </s-stack>
                          <s-divider></s-divider>
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-heading>Inside Badge Colors</s-heading>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField
                              color={textColor}
                              onChange={setTextColor}
                              label={"Text"}
                            />
                            <ColorPickerField
                              color={backgroundColor}
                              onChange={setBackgroundColor}
                              label={"Background"}
                            />
                            <s-divider />
                          </s-stack>
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-heading>OutSide Badge Colors</s-heading>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField
                              color={outsideTextColor}
                              onChange={setOutsideTextColor}
                              label={"Text"}
                            />
                            <ColorPickerField
                              color={outsideBackgroundColor}
                              onChange={setOutsideBackgroundColor}
                              label={"Background"}
                            />
                            <s-divider />
                          </s-stack>
                        </s-stack>
                        <s-stack gap="small-100">
                          <s-heading>Upsell Colors</s-heading>
                          <s-stack direction="inline" gap="small-300">
                            <ColorPickerField
                              color={upsellBackgroundColor}
                              onChange={setUpsellBackgroundColor}
                              label={"Background"}
                            />
                            <s-divider />
                          </s-stack>
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-heading>Typography</s-heading>

                          <s-stack gap="small-100">
                            <s-stack
                              direction="inline"
                              gap="large-500"
                              justifyContent="start"
                              alignItems="center"
                            >
                              <SelectField
                                label={"Main Title"}
                                fontSize={fontSettings.mainTitle.fontSize}
                                fontStyle={fontSettings.mainTitle.fontStyle}
                                OnChangeFontSize={(value) =>
                                  handleFontSizeChange("mainTitle", value)
                                }
                                onChangeFontStyle={(value) =>
                                  handleFontStyleChange("mainTitle", value)
                                }
                              />
                              <SelectField
                                label={"Card Title"}
                                fontSize={fontSettings.cardTitle.fontSize}
                                fontStyle={fontSettings.cardTitle.fontStyle}
                                OnChangeFontSize={(value) =>
                                  handleFontSizeChange("cardTitle", value)
                                }
                                onChangeFontStyle={(value) =>
                                  handleFontStyleChange("cardTitle", value)
                                }
                              />
                            </s-stack>
                            <s-stack
                              direction="inline"
                              gap="large-300"
                              justifyContent="start"
                              alignItems="center"
                            >
                              <SelectField
                                label={"Card Subtitle"}
                                fontSize={fontSettings.cardSubtitle.fontSize}
                                fontStyle={fontSettings.cardSubtitle.fontStyle}
                                OnChangeFontSize={(value) =>
                                  handleFontSizeChange("cardSubtitle", value)
                                }
                                onChangeFontStyle={(value) =>
                                  handleFontStyleChange("cardSubtitle", value)
                                }
                              />
                              <SelectField
                                label={"Inside Badge"}
                                fontSize={fontSettings.insideBadge.fontSize}
                                fontStyle={fontSettings.insideBadge.fontStyle}
                                OnChangeFontSize={(value) =>
                                  handleFontSizeChange("insideBadge", value)
                                }
                                onChangeFontStyle={(value) =>
                                  handleFontStyleChange("insideBadge", value)
                                }
                              />
                            </s-stack>
                            <s-stack
                              direction="inline"
                              gap="large-300"
                              justifyContent="start"
                              alignItems="center"
                            >
                              <SelectField
                                label={"Outside Badge"}
                                fontSize={fontSettings.outsideBadge.fontSize}
                                fontStyle={fontSettings.outsideBadge.fontStyle}
                                OnChangeFontSize={(value) =>
                                  handleFontSizeChange("outsideBadge", value)
                                }
                                onChangeFontStyle={(value) =>
                                  handleFontStyleChange("outsideBadge", value)
                                }
                              />
                              <SelectField
                                label={"ATC Button"}
                                fontSize={fontSettings.atcButton.fontSize}
                                fontStyle={fontSettings.atcButton.fontStyle}
                                OnChangeFontSize={(value) =>
                                  handleFontSizeChange("atcButton", value)
                                }
                                onChangeFontStyle={(value) =>
                                  handleFontStyleChange("atcButton", value)
                                }
                              />
                            </s-stack>
                          </s-stack>
                          <s-divider />
                        </s-stack>

                        <s-stack gap="small-100">
                          <s-stack direction="inline" gap="large-300">
                            <s-box inlineSize="200px">
                              <s-text-field label="Text" />
                            </s-box>
                            <s-stack direction="inline" gap="small-300">
                              <ColorPickerField
                                color={atcButtonBackgroundColor}
                                onChange={setAtcButtonBackgroundColor}
                                label={"Background"}
                              />

                              <ColorPickerField
                                color={atcButtonTextColor}
                                onChange={setAtcButtonTextColor}
                                label={"text"}
                              />
                            </s-stack>
                          </s-stack>
                          <s-stack
                            direction="inline"
                            justifyContent="space-between"
                          >
                            <s-box InlineSize="250px">
                              <s-paragraph>
                                Padding Y ({paddingButton}rem){" "}
                              </s-paragraph>
                              <input
                                value={paddingButton}
                                onChange={(e) => {
                                  setPaddingButton(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                              ></input>
                            </s-box>
                            <s-box InlineSize="250px">
                              <s-paragraph>
                                Border Radius ({borderRadiusButton}rem){" "}
                              </s-paragraph>
                              <input
                                value={borderRadiusButton}
                                onChange={(e) => {
                                  setBorderRadiusButton(e.target.value);
                                }}
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
                      <s-switch
                        checked={switchState}
                        onChange={handleSwitchChange}
                      />
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
                            <s-box
                              borderColor={
                                selectedGiftImage === "horizontal"
                                  ? "strong"
                                  : "base"
                              }
                              border="base"
                              onClick={() =>
                                handleGiftImageSelect("horizontal")
                              }
                            >
                              <s-image
                                aspectRatio="1"
                                src="/app/assets/vertical.svg"
                                objectFit="contain"
                              />
                            </s-box>

                            <s-box
                              borderColor={
                                selectedGiftImage === "vertical"
                                  ? "strong"
                                  : "base"
                              }
                              border="base"
                              onClick={() => handleGiftImageSelect("vertical")}
                            >
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
                          <s-box inlineSize="245px">
                            <s-text-field
                              label="Titel"
                              value={textField1}
                              onChange={(e) => {
                                setTextField1(e.target.value);
                              }}
                            />
                          </s-box>
                          <s-box inlineSize="245px">
                            <s-text-field
                              label="Subtitle"
                              value={textField2}
                              onChange={(e) => {
                                setTextField2(e.target.value);
                              }}
                            />
                          </s-box>
                        </s-stack>

                        {giftSections.map((gift) => (
                          <s-stack gap="small-100" key={gift.id}>
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                            >
                              <s-button
                                icon="product"
                                onClick={handleGiftProduct}
                              >
                                select product
                              </s-button>
                              <s-link
                                onClick={() => removeGiftSection(gift.id)}
                              >
                                remove
                              </s-link>
                            </s-stack>

                            {giftSections.giftProducts.length > 0 ? (
                              <s-stack
                                border="base"
                                borderRadius="base"
                                padding="base"
                              >
                                {giftSections.giftProducts.map((product) => (
                                  <s-stack
                                    key={product.id}
                                    direction="inline"
                                    gap="base"
                                    justifyContent="space-between"
                                  >
                                    <s-stack direction="inline" gap="base">
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

                                    <s-box>
                                      <s-icon
                                        type="x"
                                        onClick={() =>
                                          removeGiftProduct(product.id)
                                        }
                                      />
                                    </s-box>
                                  </s-stack>
                                ))}
                              </s-stack>
                            ) : (
                              <s-select label="unlock at">
                                <s-option>Offer 1</s-option>
                                <s-option>Offer 2</s-option>
                                <s-option>Offer 3</s-option>
                              </s-select>
                            )}
                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                            >
                              <s-box inlineSize="250px">
                                <s-text-field
                                  label="Label"
                                  value={giftType}
                                  onChange={(e) => {
                                    setGiftType(e.target.value);
                                  }}
                                />
                              </s-box>
                              <s-box inlineSize="250px">
                                <s-text-field
                                  label="Crossed Label"
                                  value={giftPrice}
                                  onChange={(e) => {
                                    setGiftPrice(e.target.value);
                                  }}
                                />
                              </s-box>
                            </s-stack>

                            <s-stack
                              direction="inline"
                              justifyContent="space-between"
                            >
                              <s-box inlineSize="250px">
                                <s-text-field
                                  label="Title"
                                  value={giftTitle}
                                  onChange={(e) => {
                                    setGiftTitle(e.target.value);
                                  }}
                                />
                              </s-box>
                              <s-box inlineSize="250px">
                                <s-text-field
                                  label="Locked Title"
                                  value={giftLock}
                                  onChange={(e) => {
                                    setGiftLock(e.target.value);
                                  }}
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
              <div style={{ position: "fixed" }}>
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
                          gap="base"
                          justifyContent="space-between"
                        >
                          <s-box inlineSize="170px">
                            <s-select label="Product previewing">
                              <s-option>Gift Card</s-option>
                            </s-select>
                          </s-box>
                          <s-box inlineSize="170px">
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
                            backgroundColor: lineleColor,
                            marginRight: "10px",
                          }}
                        ></div>

                        <h2
                          style={{
                            fontSize: `${fontSettings.mainTitle.fontSize}px`,
                            fontWeight: fontSettings.mainTitle.fontStyle,
                            fontStyle: fontSettings.mainTitle.italic
                              ? "italic"
                              : "normal",
                            margin: "0",
                            color: titleColor,
                          }}
                        >
                          Bundle & Save
                        </h2>

                        <div
                          style={{
                            flexGrow: 1,
                            height: "1px",
                            backgroundColor: lineleColor,
                            marginLeft: "10px",
                          }}
                        ></div>
                      </div>

                      {selectedImage === "horizontal" ? (
                        <s-stack gap="small-100">
                          <div
                            style={{
                              border: `solid 2px ${borderColor}`,
                              borderRadius: `${devBorder}px`,
                              padding: "10px",
                              position: "relative",
                              backgroundColor: cardBgColor,
                            }}
                          >
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
                                    <s-choice
                                      defaultSelected
                                      value="horizontal"
                                    />
                                  </s-choice-list>
                                </s-stack>
                                <s-stack>
                                  <s-stack
                                    direction="inline"
                                    gap="small-300"
                                    alignItems="center"
                                  >
                                    <h3
                                      style={{
                                        fontSize: `${fontSettings.cardTitle.fontSize}px`,
                                        fontWeight:
                                          fontSettings.cardTitle.fontStyle,
                                        fontStyle: fontSettings.cardTitle.italic
                                          ? "italic"
                                          : "normal",
                                        padding: "0px",
                                        margin: "0px",

                                        color: cardTitleColor,
                                      }}
                                    >
                                      Buy 2
                                    </h3>
                                    <s-box>
                                      <button
                                        style={{
                                          fontSize: `${fontSettings.insideBadge.fontSize}px`,
                                          fontWeight:
                                            fontSettings.insideBadge.fontStyle,
                                          fontStyle: fontSettings.insideBadge
                                            .italic
                                            ? "italic"
                                            : "normal",
                                          backgroundColor: backgroundColor,
                                          color: textColor,
                                          borderRadius: "5px",
                                          padding: "3px",
                                        }}
                                      >
                                        Best Offer
                                      </button>
                                    </s-box>
                                  </s-stack>
                                  <p
                                    style={{
                                      fontSize: `${fontSettings.cardSubtitle.fontSize}px`,
                                      fontWeight:
                                        fontSettings.cardSubtitle.fontStyle,
                                      fontStyle: fontSettings.cardSubtitle
                                        .italic
                                        ? "italic"
                                        : "normal",
                                      padding: "0px",
                                      margin: "0px",

                                      color: cardSubtitleColor,
                                    }}
                                  >
                                    5% OFF
                                  </p>
                                </s-stack>
                              </s-stack>
                              <s-stack>
                                <s-stack
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <h2 style={{ color: priceColor }}>$19.00</h2>
                                  {comparePrice && (
                                    <p style={{ color: comparePriceColor }}>
                                      $20.00
                                    </p>
                                  )}
                                </s-stack>
                              </s-stack>
                            </s-stack>
                            {showVariantSelection && (
                              <s-stack
                                direction="inline"
                                gap="small-300"
                                alignItems="center"
                              >
                                <s-box>
                                  <s-button variant="primary">#1</s-button>
                                </s-box>
                                {showVariantImag && (
                                  <div
                                    style={{
                                      color: "gray",
                                      backgroundColor: "rgba(241, 241, 241, 1)",
                                      padding: `${variantImagSizeValue}px`,
                                      margin: "0px",
                                      borderRadius: `${variantImagRadiusValue}px`,
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}
                                  >
                                    <FiBox
                                      style={{ width: "15px", height: "15px" }}
                                    />
                                  </div>
                                )}
                                <s-box inlineSize="100px">
                                  <s-select>
                                    <s-option>$10</s-option>
                                    <s-option>$25</s-option>
                                    <s-option>$50</s-option>
                                    <s-option>$100</s-option>
                                  </s-select>
                                </s-box>
                              </s-stack>
                            )}
                            <s-stack>{/* later */}</s-stack>

                            <div
                              style={{
                                fontSize: `${fontSettings.outsideBadge.fontSize}px`,
                                fontWeight: fontSettings.outsideBadge.fontStyle,
                                fontStyle: fontSettings.outsideBadge.italic
                                  ? "italic"
                                  : "normal",
                                right: "-5px",
                                padding: "5px",
                                top: "-12px",
                                borderRadius: "10px",
                                position: "absolute",
                                transform: "rotate(20deg)",
                                transformOrigin: "center",
                                whiteSpace: "nowrap",
                                backgroundColor: outsideBackgroundColor,
                                color: outsideTextColor,
                              }}
                            >
                              Best Seller
                            </div>
                          </div>
                        </s-stack>
                      ) : selectedImage === "vertical" ? (
                        <div
                          style={{
                            textAlign: "center",
                            alignItems: "center",
                            alignContent: "center",

                            border: `solid 2px ${borderColor}`,
                            borderRadius: `${devBorder}px`,
                            padding: "10px",
                            position: "relative",
                            backgroundColor: cardBgColor,
                          }}
                        >
                          <s-stack
                            direction="block"
                            justifyContent="center"
                            alignItems="center"
                            gap="small-100"
                          >
                            <s-box>
                              <s-choice-list>
                                <s-choice
                                  defaultSelected
                                  value="optional"
                                ></s-choice>
                              </s-choice-list>
                            </s-box>
                            <h3
                              style={{
                                fontSize: `${fontSettings.cardTitle.fontSize}px`,
                                fontWeight: fontSettings.cardTitle.fontStyle,
                                fontStyle: fontSettings.cardTitle.italic
                                  ? "italic"
                                  : "normal",
                                padding: "0px",
                                margin: "0px",

                                color: cardTitleColor,
                              }}
                            >
                              Buy 2
                            </h3>
                            <s-box>
                              <button
                                style={{
                                  fontSize: `${fontSettings.insideBadge.fontSize}px`,
                                  fontWeight:
                                    fontSettings.insideBadge.fontStyle,
                                  fontStyle: fontSettings.insideBadge.italic
                                    ? "italic"
                                    : "normal",
                                  backgroundColor: backgroundColor,
                                  color: textColor,
                                  borderRadius: "5px",
                                  padding: "3px",
                                }}
                              >
                                Best Offer
                              </button>
                            </s-box>

                            <p
                              style={{
                                fontSize: `${fontSettings.cardSubtitle.fontSize}px`,
                                fontWeight: fontSettings.cardSubtitle.fontStyle,
                                fontStyle: fontSettings.cardSubtitle.italic
                                  ? "italic"
                                  : "normal",
                                padding: "0px",
                                margin: "0px",

                                color: cardSubtitleColor,
                              }}
                            >
                              5% OFF
                            </p>
                            <h2
                              style={{
                                color: priceColor,
                                padding: "0px",
                                margin: "0px",
                              }}
                            >
                              $19.00
                            </h2>
                            {comparePrice && (
                              <p style={{ color: comparePriceColor }}>$20.00</p>
                            )}

                            <div
                              style={{
                                fontSize: `${fontSettings.outsideBadge.fontSize}px`,
                                fontWeight: fontSettings.outsideBadge.fontStyle,
                                fontStyle: fontSettings.outsideBadge.italic
                                  ? "italic"
                                  : "normal",

                                padding: "5px",
                                top: "-12px",
                                borderRadius: "10px",
                                position: "absolute",

                                backgroundColor: outsideBackgroundColor,
                                color: outsideTextColor,
                              }}
                            >
                              {" "}
                              Best Seller
                            </div>
                          </s-stack>
                        </div>
                      ) : null}
                      {switchState && (
                        <s-stack justifyContent="center" alignItems="center">
                          <h2 style={{ margin: "0px", padding: "0px" }}>
                            {textField1}
                          </h2>

                          <p style={{ margin: "0px", padding: "0px" }}>
                            {textField2}
                          </p>
                        </s-stack>
                      )}

                      {giftProducts.length > 0 &&
                        (selectedGiftImage === "horizontal" ? (
                          <div
                            style={{
                              border: "solid 2px #AAF0FB",
                              borderRadius: "10px",
                              alignItems: "center",
                              padding: "10px",
                            }}
                          >
                            {giftProducts.map((product) => (
                              <s-stack
                                key={product.id}
                                direction="inline"
                                gap="base"
                                justifyContent="space-between"
                              >
                                <s-stack
                                  direction="inline"
                                  gap="base"
                                  alignItems="center"
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
                                  <s-stack
                                    direction="inline"
                                    gap="small-100"
                                    paddingBlockStart="small"
                                  >
                                    <s-text>{giftTitle}</s-text>
                                    <button
                                      style={{
                                        padding: "5px",
                                        border: "none",
                                        borderRadius: "10px",
                                        backgroundColor: "#AAF0FB",
                                        color: "black",
                                      }}
                                    >
                                      <span>{giftType}</span>
                                      <span
                                        style={{
                                          marginLeft: "4px",
                                          textDecorationLine: "line-through",
                                        }}
                                      >
                                        {giftPrice}
                                      </span>
                                    </button>
                                  </s-stack>
                                </s-stack>
                              </s-stack>
                            ))}
                          </div>
                        ) : selectedGiftImage === "vertical" ? (
                          <div>
                            <p>hello</p>
                          </div>
                        ) : null)}

                      <s-stack justifyContent="center" alignItems="center">
                        <button
                          style={{
                            fontSize: `${fontSettings.atcButton.fontSize}px`,
                            fontWeight: fontSettings.atcButton.fontStyle,
                            fontStyle: fontSettings.atcButton.italic
                              ? "italic"
                              : "normal",
                            width: "100%",
                            backgroundColor: atcButtonBackgroundColor,
                            color: atcButtonTextColor,
                            padding: `${paddingButton}px 10px`,
                            borderRadius: `${borderRadiusButton}px`,
                          }}
                        >
                          Add To Card
                        </button>
                      </s-stack>
                    </s-stack>
                  </s-stack>
                </s-section>
              </div>
            </s-grid-item>
          </s-grid>
        </s-query-container>
      </s-stack>
    </s-page>
  );
}
