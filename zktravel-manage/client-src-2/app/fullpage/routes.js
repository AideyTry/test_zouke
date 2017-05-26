import render from 'root/RouterView.Render';
import Dlid from '../dashboard/hotelMapping/Dlid';
import Mkid from '../dashboard/hotelMapping/Mkid';
import Vtid from '../dashboard/hotelMapping/Vtid';
export default [{
	path: 'fullpage/:spid',
	component: {
		render
	},
	name: 'fullpage',
	children: [{
			path: 'vtid',
			component: Vtid,
			name:'fullpage-vtids'
		},
		{
			path: 'mkid',
			component: Mkid,
			name:'fullpage-mkids'
		},
		{
			path: 'dlid',
			component: Dlid,
			name:'fullpage-dlids'
		},
	]
}]
