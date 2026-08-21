import { desc } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { auditEvents, evidenceItems } from "../../../../db/schema";

export async function GET(){const user=await getChatGPTUser();if(!user)return Response.json({error:"Authentication required"},{status:401});const rows=await getDb().select().from(evidenceItems).orderBy(desc(evidenceItems.createdAt)).limit(50);return Response.json({evidence:rows.map(({objectKey,...item})=>item)});}
export async function POST(request:Request){
 const user=await getChatGPTUser();if(!user)return Response.json({error:"Authentication required"},{status:401});
 if(user.email.toLowerCase()!=="kingojoe2000@gmail.com")return Response.json({error:"Server-side role does not permit evidence upload"},{status:403});
 const form=await request.formData(),file=form.get("file"),controlRef=String(form.get("controlRef")||"").trim();
 if(!(file instanceof File)||!controlRef)return Response.json({error:"Control reference and file are required"},{status:400});
 if(file.size>10*1024*1024)return Response.json({error:"Evidence file must be 10 MB or smaller"},{status:400});
 const allowed=["application/pdf","text/csv","text/plain","application/json","image/png","image/jpeg"];if(!allowed.includes(file.type))return Response.json({error:"Unsupported evidence type"},{status:400});
 const bytes=await file.arrayBuffer(),hash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes))).map(b=>b.toString(16).padStart(2,"0")).join("");
 const id=`EV-${crypto.randomUUID().slice(0,8).toUpperCase()}`,objectKey=`pci-evidence/${id}/${file.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`;
 await env.BUCKET.put(objectKey,bytes,{httpMetadata:{contentType:file.type},customMetadata:{owner:user.email,controlRef,sha256:hash}});
 const db=getDb();const [record]=await db.insert(evidenceItems).values({id,objectKey,filename:file.name,contentType:file.type,size:file.size,controlRef,ownerEmail:user.email,sha256:hash,status:"Pending review"}).returning();
 const eventId=`AUD-${crypto.randomUUID().slice(0,8).toUpperCase()}`,eventHash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`${eventId}|${user.email}|UPLOAD|${id}|${hash}`)))).map(b=>b.toString(16).padStart(2,"0")).join("");
 await db.insert(auditEvents).values({id:eventId,actorEmail:user.email,action:"EVIDENCE_UPLOAD",objectId:id,eventHash});
 return Response.json({evidence:record},{status:201});
}
