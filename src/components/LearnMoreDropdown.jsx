import { DropdownMenu } from "radix-ui";

let LearnMoreDropdown = ({children}) => (
	<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild>
  {children}
	</DropdownMenu.Trigger>
		<DropdownMenu.Portal>
			<DropdownMenu.Content sideOffset={5} collisionPadding={5} className="bg-white rounded-lg border border-gray-200 py-2 px-2 min-w-40">
				<DropdownMenu.Item className="pr-6 pl-4 py-2 rounded-lg hover:bg-gray-50">
	        Suspend
				</DropdownMenu.Item>
				<DropdownMenu.Item  className="pr-6 pl-4 py-2 rounded-lg hover:bg-gray-50">
	        Reset
				</DropdownMenu.Item>
				<DropdownMenu.Item  className="pr-6 pl-4 py-2 rounded-lg hover:bg-gray-50">
	        Edit
				</DropdownMenu.Item>
				<DropdownMenu.Item  className="pr-6 pl-4 py-2 rounded-lg hover:bg-gray-50">
	        Card Info
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	</DropdownMenu.Root>
);

export default LearnMoreDropdown
