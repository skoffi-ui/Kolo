import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatFCFA } from "./format.ts";

describe("formatFCFA", () => {
  it("groups thousands in fr-FR and puts a NBSP before FCFA", () => {
    const grouped = new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      useGrouping: true,
    }).format(12500);
    const output = formatFCFA(12500);

    assert.equal(output, `${grouped}\u00A0FCFA`);
    assert.equal(output.endsWith("\u00A0FCFA"), true);
    assert.equal(output.includes(","), false);
    assert.equal(output.includes("."), false);
    assert.equal(output.includes(".00"), false);
    assert.match(grouped, /12\D500/);
  });

  it("rounds to the nearest integer and keeps zero without decimals", () => {
    assert.equal(formatFCFA(0), `0\u00A0FCFA`);
    assert.equal(
      formatFCFA(1499.6),
      `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(1500)}\u00A0FCFA`,
    );
  });
});
