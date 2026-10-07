CREATE TABLE support_tasks(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN'
        CHECK(status IN ('OPEN','IN_PROGRESS','RESOLVED')),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    -- ON DELETE CASCADE = When you delete a parent record, all related child records are automatically deleted too.
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);