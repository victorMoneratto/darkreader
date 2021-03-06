import '../polyfills';
import {DEFAULT_THEME} from '../../../src/defaults';
import {createOrUpdateDynamicTheme, removeDynamicTheme} from '../../../src/inject/dynamic-theme';
import {timeout} from '../../test-utils';

const theme = {
    ...DEFAULT_THEME,
    darkSchemeBackgroundColor: 'black',
    darkSchemeTextColor: 'white',
};
let container: HTMLElement;

beforeEach(() => {
    container = document.body;
    container.innerHTML = '';
});

afterEach(() => {
    removeDynamicTheme();
    container.innerHTML = '';
});

describe('Inline style override', () => {
    it('should override inline style', () => {
        container.innerHTML = '<span style="color: red;">Inline style override</span>';
        createOrUpdateDynamicTheme(theme, null, false);
        expect(getComputedStyle(document.querySelector('span')).color).toBe('rgb(255, 26, 26)');
    });

    it('should watch for inline style change', async () => {
        container.innerHTML = '<span style="color: red;">Watch inline style</span>';
        createOrUpdateDynamicTheme(theme, null, false);
        const span = document.querySelector('span');
        expect(getComputedStyle(span).color).toBe('rgb(255, 26, 26)');

        span.style.color = 'green';
        await timeout(0);
        expect(getComputedStyle(span).color).toBe('rgb(140, 255, 140)');
    });
});
