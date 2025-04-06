For whatever reason, import from "@testing-library/vue" does not work. It says "Vue not defined"

Therefore this is a copy of testing-library/vue code from
https://github.com/testing-library/vue-testing-library/tree/main/src

The only difference is the replacement of !process.env with !import.meta