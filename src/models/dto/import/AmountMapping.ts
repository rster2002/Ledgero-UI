enum AmountMapping {
    /**
     * Used when the value of the CSV looks like '129'
     */
    CENTS = "cents",

    /**
     * Used when the vale of the CSV looks like '1,29' or '1.29'
     */
    EURO = "euro",
}

export default AmountMapping;
