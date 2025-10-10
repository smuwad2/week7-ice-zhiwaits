import {test, expect} from '@playwright/experimental-ct-vue';
import Ex1 from '../src/components/Ex1.vue';
test('ex1_add', async ({mount}) => {
  const component = await mount(Ex1);
  await component.getByRole('paragraph').filter({ hasText: 'x' }).getByRole('textbox').fill("15");
  await component.getByRole('paragraph').filter({ hasText: 'y' }).getByRole('textbox').fill("7");
  await component.getByRole("combobox").selectOption("+");
  await expect(component.locator("p:nth-child(5)")).toContainText("22");
});

test('ex1_minus', async ({mount}) => {
  const component = await mount(Ex1);
  await component.getByRole('paragraph').filter({ hasText: 'x' }).getByRole('textbox').fill("15");
  await component.getByRole('paragraph').filter({ hasText: 'y' }).getByRole('textbox').fill("7");
  await component.getByRole("combobox").selectOption("-");
  await expect(component.locator("p:nth-child(5)")).toContainText("8");
});

test('ex1_multiply', async ({mount}) => {
  const component = await mount(Ex1);
  await component.getByRole('paragraph').filter({ hasText: 'x' }).getByRole('textbox').fill("15");
  await component.getByRole('paragraph').filter({ hasText: 'y' }).getByRole('textbox').fill("7");
  await component.getByRole("combobox").selectOption("*");
  await expect(component.locator("p:nth-child(5)")).toContainText("105");
});

test('ex1_divide', async ({mount}) => {
  const component = await mount(Ex1);
  await component.getByRole('paragraph').filter({ hasText: 'x' }).getByRole('textbox').fill("14");
  await component.getByRole('paragraph').filter({ hasText: 'y' }).getByRole('textbox').fill("7");
  await component.getByRole("combobox").selectOption("/");
  await expect(component.locator("p:nth-child(5)")).toContainText("2");
});

test('ex1_modulus', async ({mount}) => {
  const component = await mount(Ex1);
  await component.getByRole('paragraph').filter({ hasText: 'x' }).getByRole('textbox').fill("17");
  await component.getByRole('paragraph').filter({ hasText: 'y' }).getByRole('textbox').fill("7");
  await component.getByRole("combobox").selectOption("%");
  await expect(component.locator("p:nth-child(5)")).toContainText("3");
});