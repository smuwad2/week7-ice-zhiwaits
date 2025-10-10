import {test, expect} from '@playwright/experimental-ct-vue';
import axios from 'axios';
import viewposts from '../src/components/ViewPosts.vue';

var idText: string | null;
var entryText: string | null;
var moodText: string | null;

test('viewposts load test', async ({mount}) => {
    const component = await mount(viewposts);
    const table = component.locator("table");
    const entryText = await table.locator("tr:nth-child(2) td:nth-child(2)").textContent()
    console.log(entryText)
    const moodText = await table.locator("tr:nth-child(2) td:nth-child(3)").textContent()
    const edit_buttons = await component.getByRole("button", {name:"Edit"}).all()
    await edit_buttons[1].click();
    expect(await component.locator("#editPost").isVisible()).toBe(true);
    expect(await component.locator("textarea").inputValue()).toBe(entryText);
    expect(await component.locator("select").inputValue()).toBe(moodText);
})

test('viewposts update post 01', async ({mount}) => {
    const component = await mount(viewposts);
    const table = component.locator("table");
    idText = await table.locator("tr:nth-child(2) td:nth-child(1)").textContent()
    entryText = await table.locator("tr:nth-child(2) td:nth-child(2)").textContent()
    moodText = await table.locator("tr:nth-child(2) td:nth-child(3)").textContent()
    const edit_buttons = await component.getByRole("button", {name:"Edit"}).all()
    await edit_buttons[1].click();
    expect(await component.locator("#editPost").isVisible()).toBe(true);
    let newEntryText = entryText + " :-)"
    let newMoodText = "Happy";
    await component.locator("#entry").fill(newEntryText);
    await component.locator("#mood").selectOption(newMoodText);
    await component.getByRole("button", {"name": "Update Post"}).click();
})

test('viewposts update post 02', async({mount}) => {
    const component = await mount(viewposts)
    const table = component.locator("table");
    const newEntryCellVal =  await table.locator("tr:nth-child(2) td:nth-child(2)").textContent()
    console.log(newEntryCellVal);
    expect(newEntryCellVal?.indexOf(":-)")!=-1).toBeTruthy()
    const postData = {
        "id": Number(idText),
        "entry": entryText,
        "mood": moodText
    }
    await axios.post('http://localhost:3000/updatePost?id=' + Number(idText), postData);
})