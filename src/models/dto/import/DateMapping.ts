/**
 * Used to configure the datetime mapping for the column.
 */
export default interface DateMapping {
    /**
     * Template for formatting the datetime. Used for when the actual value of the date column
     * cannot be used as a datetime. For example: if the date column has a value '2023-02-03', it
     * is missing a time, so the template can be set so something like '$ 00:00' where the '$' will
     * be replaced with the value of the column. Then the result can be parsed using the [format]
     * option.
     */
    template: string | null;

    /**
     * The format to use when parsing the date. Check the
     * [chrono documentation](https://docs.rs/chrono/0.4.23/chrono/format/strftime/index.html) for
     * the possible specifiers that can be used here.
     */
    format: string;
}
