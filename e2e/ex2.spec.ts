import {test, expect} from '@playwright/experimental-ct-vue';
import Ex2 from '../src/components/Ex2.vue';

test('ex2_deleteitem', async ({mount}) => {
  const component = await mount(Ex2);
  const liElem = component.getByRole('listitem').filter({ hasText: 'mouse' });
  await liElem.getByRole('button').click()
  await expect(component.getByRole('listitem').filter({ hasText: 'mouse' })).toHaveCount(0);
  await expect(component.getByRole('listitem')).toHaveCount(4);
});

test('ex2_addnew', async ({mount}) => {
  const component = await mount(Ex2);
  await component.locator('input').fill("iron");
  await component.getByRole('button').filter({ hasText: 'add' }).click();
  await expect(component.getByRole('listitem').filter({ hasText: 'iron' })).toHaveCount(1);
  await expect(component.getByRole('listitem')).toHaveCount(6);
});
