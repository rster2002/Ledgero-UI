<Popup open={true}>
  {JSON.stringify(value)}

  <Select bind:value>
    <Option value="Alice">Alice</Option>
    <Option value="Bob">Bob</Option>

    <Option value="Nested">
      <span>Nested options</span>

      <NestedOptions>
        <Option value="nested-a">
          <span>Span Nested option one</span>
        </Option>
        <Option value="nested-b">Nested option two</Option>

        <Option value="nested-c">
          Nested option three

          <NestedOptions>
            <Option value="deep-a">Deeply nested option one</Option>
            <Option value="deep-b">Deeply nested option two</Option>

            <Option>
              Deeply nested option three

              <NestedOptions>
                <Option>Deeply nested option one</Option>
                <Option>Deeply nested option two</Option>

                <Option>
                  Deeply nested option three

                  <NestedOptions>
                    <Option>Deeply nested option one</Option>
                    <Option>Deeply nested option two</Option>

                    <Option>
                      Deeply nested option three

                      <NestedOptions>
                        <Option>Deeply nested option one</Option>
                        <Option>Deeply nested option two</Option>

                        <Option>
                          Deeply nested option three

                          <NestedOptions>
                            <Option>Deeply nested option one</Option>
                            <Option>Deeply nested option two</Option>

                            <Option>
                              Deeply nested option three

                              <NestedOptions>
                                <Option>Deeply nested option one</Option>
                                <Option>Deeply nested option two</Option>
                              </NestedOptions>
                            </Option>
                          </NestedOptions>
                        </Option>
                      </NestedOptions>
                    </Option>
                  </NestedOptions>
                </Option>
              </NestedOptions>
            </Option>
          </NestedOptions>
        </Option>
      </NestedOptions>
    </Option>
  </Select>
</Popup>

<script lang="ts">
// Components
import Select from "@/components/common/Select.svelte";
import Option from "@/components/common/Select/Option.svelte";
import NestedOptions from "@/components/common/Select/NestedOptions.svelte";
import Popup from "@/components/common/Popup.svelte";

// Data
let value = [];
</script>
