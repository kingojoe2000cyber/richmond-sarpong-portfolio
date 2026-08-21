import { chatGPTSignOutPath, requireChatGPTUser } from "../../chatgpt-auth";
import OperationsClient from "./OperationsClient";
import "./operations.css";
export const dynamic = "force-dynamic";
export default async function OperationsPage(){
  const user=await requireChatGPTUser("/pci-dss/operations");
  const role=user.email.toLowerCase()==="kingojoe2000@gmail.com"?"Program Administrator":"Independent Assessor";
  return <main className="ops-page"><header className="ops-top"><div><span>PCI DSS V4.0 · SECURE OPERATIONS</span><h1>Continuous Assurance Workspace</h1><p>Authenticated as {user.displayName}</p></div><div><b>{role}</b><small>Protected by ChatGPT sign-in; MFA follows the identity-provider policy</small><a href={chatGPTSignOutPath("/pci-dss")}>Sign out</a></div></header><OperationsClient userEmail={user.email} role={role}/></main>;
}
