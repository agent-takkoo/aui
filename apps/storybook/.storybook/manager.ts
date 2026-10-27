import { addons } from "storybook/manager-api";
import { TOOL_ID } from "storybook/viewport";

// 웹·모바일 선택은 Docs에서도 보이는 globalTypes toolbar 하나로 제공한다.
addons.setConfig({ toolbar: { [TOOL_ID]: { hidden: true } } });
