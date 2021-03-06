import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Table from "@/components/Table.vue";
import { directive } from "@/util/tooltip";

const global = {
  directives: {
    tooltip: directive
  }
};

describe("Table.vue", () => {
  const cols = [
    {
      key: "firstCol",
      name: "First Col"
    },
    {
      key: "secondCol",
      name: "Second Col"
    },
    {
      key: "thirdCol",
      name: "Third Col",
      sortable: false
    },
    {
      key: "fourthCol",
      name: "Fourth Col",
      button: {
        action: () => "remove",
        icon: () => "fas fa-trash",
        tooltip: () => "Click me!"
      }
    }
  ];
  const rows = [
    { firstCol: "apple", secondCol: 0, thirdCol: "big long string x" },
    { firstCol: "pear", secondCol: -10, thirdCol: "big long string y" },
    { firstCol: "banana", secondCol: 10, thirdCol: "big long string z" }
  ];

  const wrapper = mount(Table, {
    props: {
      cols: cols,
      rows: rows
    },
    global
  });

  const getCell = (col: number, row: number, query?: string) =>
    wrapper.find(
      [
        "table",
        row > 0 ? "tbody" : "thead",
        `tr:nth-child(${row + (row > 0 ? 0 : 1)})`,
        `${row > 0 ? "td" : "th"}:nth-child(${col + 1})`,
        query || ""
      ].join(" ")
    );

  const checkCell = (col: number, row: number, value: string) =>
    expect(getCell(col, row).text()).to.include(value);

  it("renders properly", () => {
    checkCell(0, 0, "First Col");
    checkCell(2, 0, "Third Col");
    checkCell(0, 1, "apple");
    checkCell(1, 2, "0");
    checkCell(2, 3, "big long string z");
  });

  it("sorts properly", async () => {
    await getCell(0, 0, "button").trigger("click");
    checkCell(0, 1, "apple");
    checkCell(0, 2, "banana");
    checkCell(0, 3, "pear");
    await getCell(0, 0, "button").trigger("click");
    checkCell(0, 1, "pear");
    checkCell(0, 2, "banana");
    checkCell(0, 3, "apple");
    await getCell(1, 0, "button").trigger("click");
    checkCell(1, 1, "-10");
    checkCell(1, 2, "0");
    checkCell(1, 3, "10");
    await getCell(1, 0, "button").trigger("click");
    checkCell(1, 1, "10");
    checkCell(1, 2, "0");
    checkCell(1, 3, "-10");
    expect(getCell(2, 0, "button").exists()).to.be.false;
  });

  it("emits actions properly", async () => {
    const button = getCell(3, 1, "button");
    expect(button.attributes("aria-label")).to.equal("Click me!");
    await button.trigger("click");
    expect(wrapper.emitted().remove).to.exist;
  });

  const rows2 = Array(30)
    .fill(null)
    .map(() => ({ firstCol: "apple" }));
  const wrapper2 = mount(Table, {
    props: {
      cols: cols,
      rows: rows2
    },
    global
  });

  it("paginates properly", async () => {
    const prev = wrapper2.find(".pages > button:first-child");
    const next = wrapper2.find(".pages > button:last-child");
    const count = wrapper2.find(".pages > span");
    await prev.trigger("click");
    expect(count.text()).to.include("1 to 10 of 30");
    await next.trigger("click");
    await next.trigger("click");
    await next.trigger("click");
    await next.trigger("click");
    expect(count.text()).to.include("21 to 30 of 30");
    await prev.trigger("click");
    expect(count.text()).to.include("11 to 20 of 30");
  });
});
