BEGIN;

Create Extension if NOT EXISTS pgcrypto; 


Create table users (

    id UUID Primary Key Default gen_random_uuid(),  

    email TEXT not null unique, 
    username TEXT unique, 
    phone_number TEXT unique, 

    -- Verification fields 
    is_verified Boolean Not Null Default false, 
    verification_token TEXT unique, 
    verification_expiry TIMESTAMPTZ, 
    verified_at TIMESTAMPTZ, 

    -- Metadata 
    created_at TIMESTAMPTZ Not Null Default now(), 
    updated_at TIMESTAMPTZ Not Null Default now(), 
    last_login_at TIMESTAMPTZ
); 


-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();


COMMIT; 