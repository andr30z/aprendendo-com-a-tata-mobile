import React from "react";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { Member } from "../../../../Interfaces/index";
interface MembersProps {
  members: Array<Member>;
}
/**
 *
 * @author andr3z0
 **/
const Members: React.FC<MembersProps> = ({ members }) => {
  return <BaseContainer></BaseContainer>;
};

export default Members;
