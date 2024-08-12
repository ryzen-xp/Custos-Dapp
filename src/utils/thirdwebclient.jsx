import { createThirdwebClient } from "thirdweb";

const client_id = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: client_id,
});
