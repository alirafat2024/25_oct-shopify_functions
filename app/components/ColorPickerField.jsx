export function ColorPickerField({ label, color, onChange }) {
  return (
    <s-stack gap="small-300">
      <s-box maxInlineSize="110px">
        <s-color-field
          value={color}
          onChange={(e) => onChange(e.target.value)}
          label={label}
        />
      </s-box>
    </s-stack>
  );
}
