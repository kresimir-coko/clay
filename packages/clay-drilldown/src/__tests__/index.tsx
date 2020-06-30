/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ClayDrilldown from '..';
import {cleanup, render} from '@testing-library/react';
import React from 'react';

describe('ClayDrilldown', () => {
	afterEach(cleanup);

	it('renders', () => {
		const {container} = render(<ClayDrilldown title="Drilldown" />);

		expect(container).toMatchSnapshot();
	});
});
