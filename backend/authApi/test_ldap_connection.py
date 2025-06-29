# import ldap

# # Prevent TLS certificate validation (development only)
# ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)

# # Explicitly use SSL
# server = "ldap://addisbanksc.local:389"
# bind_dn = "addisbanksc\\fetcher"
# password = "F3+Ch@202%"

# # Initialize connection
# conn = ldap.initialize(server)
# conn.set_option(ldap.OPT_PROTOCOL_VERSION, 3)
# conn.set_option(ldap.OPT_REFERRALS, 0)
# conn.start_tls_s()

# # Bind
# conn.simple_bind_s(bind_dn, password)
# print("✅ Bind successful")

# # Search
# base_dn = "dc=addisbanksc,dc=local"
# search_filter = "(sAMAccountName=daniel.semu)"
# result = conn.search_s(base_dn, ldap.SCOPE_SUBTREE, search_filter)

# print("🔍 Search result:", result)
