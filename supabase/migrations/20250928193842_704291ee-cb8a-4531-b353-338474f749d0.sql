-- Promote info@devmart.sr to admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('b87f8be8-e265-458c-a6ee-ea239b4f0848', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;