export function ColorPickerField({ label }) {
  return (
    <s-stack gap="small-300">
      <s-box maxInlineSize="110px">
        <s-color-field value="" label={label} />
      </s-box>
    </s-stack>
  );
}
